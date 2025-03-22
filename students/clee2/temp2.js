import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as SQLite from 'expo-sqlite';
import * as Notifications from 'expo-notifications';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from 'expo-file-system';
import NetInfo from '@react-native-community/netinfo';

// Enhanced configuration with error handling settings
const CONFIG = {
  batchSize: 3,
  maxRetries: 3,
  commentDelay: 3000,
  monthInMs: 30 * 24 * 60 * 60 * 1000,
  retryDelays: [5000, 15000, 30000], // Progressive retry delays
  db: SQLite.openDatabase('meals.db'),
  genAI: new GoogleGenerativeAI('YOUR_API_KEY'),
  errorTypes: {
    NETWORK: 'NETWORK_ERROR',
    AI_SERVICE: 'AI_SERVICE_ERROR',
    DATABASE: 'DATABASE_ERROR',
    FILE_SYSTEM: 'FILE_SYSTEM_ERROR',
  }
} as const;

// Enhanced atoms with error state
const isProcessingAtom = atom(false);
const notificationsEnabledAtom = atom(false);
const systemErrorAtom = atom<null | { type: string; message: string }>(null);
const processingStatusAtom = atom<{
  total: number;
  processed: number;
  failed: number;
}>({ total: 0, processed: 0, failed: 0 });

// Custom error classes
class MealSystemError extends Error {
  constructor(public type: string, message: string) {
    super(message);
    this.name = 'MealSystemError';
  }
}

// Enhanced database operations with better error handling
const withTransaction = async <T,>(
  operation: (tx: SQLite.SQLTransaction) => Promise<T>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    CONFIG.db.transaction(
      async (tx) => {
        try {
          const result = await operation(tx);
          resolve(result);
        } catch (error) {
          reject(new MealSystemError(CONFIG.errorTypes.DATABASE, error.message));
        }
      },
      (error) => reject(new MealSystemError(CONFIG.errorTypes.DATABASE, error.message))
    );
  });
};

// Enhanced utility functions
const retryWithBackoff = async <T,>(
  operation: () => Promise<T>,
  retryCount: number = 0
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retryCount >= CONFIG.maxRetries) throw error;
    
    const delay = CONFIG.retryDelays[retryCount] || CONFIG.retryDelays[CONFIG.retryDelays.length - 1];
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return retryWithBackoff(operation, retryCount + 1);
  }
};

const validateImage = async (imageUri: string): Promise<boolean> => {
  try {
    const info = await FileSystem.getInfoAsync(imageUri);
    return info.exists && info.size > 0;
  } catch {
    return false;
  }
};

// Enhanced hooks
export const useMealSystem = () => {
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [systemError, setSystemError] = useAtom(systemErrorAtom);
  const [processingStatus, setProcessingStatus] = useAtom(processingStatusAtom);
  const notificationsEnabled = useAtomValue(notificationsEnabledAtom);

  const handleError = (error: Error) => {
    if (error instanceof MealSystemError) {
      setSystemError({ type: error.type, message: error.message });
    } else {
      setSystemError({ 
        type: 'UNKNOWN_ERROR', 
        message: 'An unexpected error occurred' 
      });
    }
    console.error('MealSystem Error:', error);
  };

  const processComment = async (meal) => {
    try {
      // Validate image still exists
      if (!(await validateImage(meal.image_uri))) {
        throw new MealSystemError(
          CONFIG.errorTypes.FILE_SYSTEM,
          `Image not found: ${meal.image_uri}`
        );
      }

      const comment = await retryWithBackoff(() => 
        generateMealComment(meal.image_uri)
      );

      await withTransaction(async (tx) => {
        await new Promise((resolve, reject) => {
          tx.executeSql(
            'UPDATE meals SET comment = ?, comment_posted = 1 WHERE id = ?',
            [comment, meal.id],
            async () => {
              if (notificationsEnabled) {
                try {
                  await Notifications.scheduleNotificationAsync({
                    content: {
                      title: "New AI Comment on Your Meal!",
                      body: comment,
                    },
                    trigger: null,
                  });
                } catch (error) {
                  console.warn('Notification failed:', error);
                  // Continue even if notification fails
                }
              }
              resolve();
            },
            (_, error) => reject(error)
          );
        });
      });

      setProcessingStatus(prev => ({
        ...prev,
        processed: prev.processed + 1
      }));

    } catch (error) {
      setProcessingStatus(prev => ({
        ...prev,
        failed: prev.failed + 1
      }));

      await withTransaction(tx => 
        new Promise((resolve) => {
          tx.executeSql(
            'UPDATE meals SET retry_count = retry_count + 1, last_retry = ?, error = ? WHERE id = ?',
            [Date.now(), error.message, meal.id],
            resolve
          );
        })
      );

      handleError(error);
    }
  };

  const checkPendingComments = async () => {
    if (isProcessing) return;

    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new MealSystemError(
          CONFIG.errorTypes.NETWORK,
          'No network connection available'
        );
      }

      setIsProcessing(true);
      setSystemError(null);
      
      const pendingMeals = await withTransaction(async (tx) => {
        return new Promise((resolve, reject) => {
          tx.executeSql(
            `SELECT * FROM meals 
             WHERE comment_posted = 0 
             AND scheduled_for <= ? 
             AND (retry_count < ? OR last_retry < ?)
             ORDER BY scheduled_for ASC
             LIMIT ?`,
            [
              Date.now(),
              CONFIG.maxRetries,
              Date.now() - (30 * 60 * 1000),
              CONFIG.batchSize
            ],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => reject(error)
          );
        });
      });

      setProcessingStatus({
        total: pendingMeals.length,
        processed: 0,
        failed: 0
      });

      for (const meal of pendingMeals) {
        await processComment(meal);
        await new Promise(resolve => setTimeout(resolve, CONFIG.commentDelay));
      }

      await cleanupOldData();

    } catch (error) {
      handleError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    saveMeal: async (imageUri: string) => {
      try {
        if (!(await validateImage(imageUri))) {
          throw new MealSystemError(
            CONFIG.errorTypes.FILE_SYSTEM,
            'Invalid image file'
          );
        }

        const scheduledTime = getRandomFutureTime(2);
        
        await withTransaction(tx =>
          new Promise((resolve, reject) => {
            tx.executeSql(
              'INSERT INTO meals (image_uri, created_at, scheduled_for) VALUES (?, ?, ?)',
              [imageUri, Date.now(), scheduledTime],
              (_, result) => resolve(result),
              (_, error) => reject(error)
            );
          })
        );
      } catch (error) {
        handleError(error);
        throw error; // Re-throw to let caller handle it
      }
    },
    checkPendingComments,
    isProcessing,
    systemError,
    processingStatus,
    clearError: () => setSystemError(null)
  };
};