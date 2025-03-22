// mealSystem.js
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import * as SQLite from 'expo-sqlite/next';
import * as Notifications from 'expo-notifications';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from 'expo-file-system';
import NetInfo from '@react-native-community/netinfo';

// Constants
const CONFIG = {
  batchSize: 3,
  maxRetries: 3,
  commentDelay: 3000,
  monthInMs: 30 * 24 * 60 * 60 * 1000,
  genAI: new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY)
} as const;

// Database setup
const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('meals.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_uri TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      scheduled_for INTEGER NOT NULL,
      comment TEXT,
      comment_posted INTEGER DEFAULT 0,
      retry_count INTEGER DEFAULT 0,
      last_retry INTEGER
    )
  `);
  return db;
};

// Atoms
const dbAtom = atom(async () => await openDatabase());
const isProcessingAtom = atom(false);
const notificationsEnabledAtom = atomWithStorage('notificationsEnabled', false);
const mealsAtom = atom(async (get) => {
  const db = await get(dbAtom);
  const { rows } = await db.getArrayAsync('SELECT * FROM meals ORDER BY created_at DESC');
  return rows;
});

// Utility functions
const getRandomFutureTime = (daysAhead = 1) => {
  const now = Date.now();
  const maxTime = now + (daysAhead * 24 * 60 * 60 * 1000);
  return Math.floor(now + Math.random() * (maxTime - now));
};

const generateMealComment = async (imageUri) => {
  try {
    const imageBytes = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    const model = CONFIG.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Write a friendly, encouraging comment about this meal photo. Keep it brief and casual.",
      { inlineData: { data: imageBytes, mimeType: "image/jpeg" } }
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error('Error generating comment:', error);
    return "Looks delicious! 😋";
  }
};

// Hooks
export const useNotificationSetup = () => {
  const setNotificationsEnabled = useSetAtom(notificationsEnabledAtom);
  
  return async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      setNotificationsEnabled(finalStatus === 'granted');
    } catch (error) {
      console.error('Error setting up notifications:', error);
      setNotificationsEnabled(false);
    }
  };
};

export const useMealSystem = () => {
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const notificationsEnabled = useAtomValue(notificationsEnabledAtom);
  const getDb = useAtomValue(dbAtom);
  
  const processComment = async (meal) => {
    const db = await getDb;
    
    try {
      const comment = await generateMealComment(meal.image_uri);
      
      await db.execAsync({
        sql: 'UPDATE meals SET comment = ?, comment_posted = 1 WHERE id = ?',
        args: [comment, meal.id]
      });
      
      if (notificationsEnabled) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New AI Comment on Your Meal!",
            body: comment,
          },
          trigger: null,
        });
      }
    } catch (error) {
      await db.execAsync({
        sql: 'UPDATE meals SET retry_count = retry_count + 1, last_retry = ? WHERE id = ?',
        args: [Date.now(), meal.id]
      });
      throw error;
    }
  };
  
  const checkPendingComments = async () => {
    if (isProcessing) return;
    
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) return;
    
    setIsProcessing(true);
    const db = await getDb;
    
    try {
      const now = Date.now();
      const { rows } = await db.getArrayAsync(
        `SELECT * FROM meals 
         WHERE comment_posted = 0 
         AND scheduled_for <= ? 
         AND (retry_count < ? OR last_retry < ?)
         ORDER BY scheduled_for ASC
         LIMIT ?`,
        [now, CONFIG.maxRetries, now - (30 * 60 * 1000), CONFIG.batchSize]
      );
      
      for (const meal of rows) {
        try {
          await processComment(meal);
          await new Promise(resolve => setTimeout(resolve, CONFIG.commentDelay));
        } catch (error) {
          console.warn('Error processing meal:', error);
        }
      }
      
      await cleanupOldData();
    } finally {
      setIsProcessing(false);
    }
  };
  
  const cleanupOldData = async () => {
    const db = await getDb;
    const cutoffDate = Date.now() - CONFIG.monthInMs;
    
    const { rows } = await db.getArrayAsync(
      'SELECT image_uri FROM meals WHERE created_at < ?',
      [cutoffDate]
    );
    
    await Promise.all(rows.map(meal => 
      FileSystem.deleteAsync(meal.image_uri).catch(error => 
        console.warn('Error deleting old image:', error)
      )
    ));
    
    await db.execAsync({
      sql: 'DELETE FROM meals WHERE created_at < ?',
      args: [cutoffDate]
    });
  };
  
  const saveMeal = async (imageUri) => {
    const db = await getDb;
    const scheduledTime = getRandomFutureTime(2);
    
    await db.execAsync({
      sql: 'INSERT INTO meals (image_uri, created_at, scheduled_for) VALUES (?, ?, ?)',
      args: [imageUri, Date.now(), scheduledTime]
    });
  };
  
  return {
    saveMeal,
    checkPendingComments,
    isProcessing
  };
};