// mealCommentGemini.ts
import { openDatabase, type SQLiteDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleGenerativeAI,
  type GenerateContentResult,
} from "@google/generative-ai";

// Modern SQLite setup using the new API
const db = openDatabase("mealdb.db");

// Initialize Gemini with the latest model
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface MealData {
  mealName: string;
  mood: string;
  isHealthy: boolean;
  ingredients?: string[];
  mealTime?: string;
}

interface MealHistory {
  isRepeated: boolean;
  isFavorite: boolean;
}

// Modern SQLite query wrapper using Promises
const executeQuery = async (
  db: SQLiteDatabase,
  query: string,
  params: any[] = []
): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Modern helper function to check meal history
const checkMealHistory = async (mealName: string): Promise<MealHistory> => {
  try {
    const result = await executeQuery(
      db,
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_favorite = 1 THEN 1 ELSE 0 END) as favorite_count
       FROM meals 
       WHERE meal_name = ?`,
      [mealName]
    );

    const { total, favorite_count } = result.rows._array[0];
    return {
      isRepeated: total > 1,
      isFavorite: favorite_count > 0,
    };
  } catch (error) {
    console.error("Database query error:", error);
    return { isRepeated: false, isFavorite: false };
  }
};

// Comment history management
const RECENT_COMMENTS_KEY = "recent_meal_comments";
const MAX_RECENT_COMMENTS = 10;

const storeRecentComment = async (comment: string): Promise<void> => {
  try {
    const recentCommentsStr = await AsyncStorage.getItem(RECENT_COMMENTS_KEY);
    const comments: string[] = recentCommentsStr
      ? JSON.parse(recentCommentsStr)
      : [];

    comments.unshift(comment);
    if (comments.length > MAX_RECENT_COMMENTS) {
      comments.length = MAX_RECENT_COMMENTS;
    }

    await AsyncStorage.setItem(RECENT_COMMENTS_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error("Error storing recent comment:", error);
  }
};

const getRecentComments = async (): Promise<string[]> => {
  try {
    const commentsStr = await AsyncStorage.getItem(RECENT_COMMENTS_KEY);
    return commentsStr ? JSON.parse(commentsStr) : [];
  } catch (error) {
    console.error("Error retrieving recent comments:", error);
    return [];
  }
};

// Main function to generate AI comment using modern syntax
export const generateMealComment = async (meal: MealData): Promise<string> => {
  try {
    const { mealName, mood, isHealthy, ingredients = [], mealTime = "" } = meal;

    // Get meal history and recent comments concurrently
    const [{ isRepeated, isFavorite }, recentComments] = await Promise.all([
      checkMealHistory(mealName),
      getRecentComments(),
    ]);

    // Create structured prompt for Gemini
    const promptParts = [
      {
        text: `Generate a friendly, encouraging comment about a meal with these details:

Meal Context:
- Name: ${mealName}
- Mood: ${mood}
- Health Factor: ${isHealthy ? "Healthy" : "Indulgent"}
- Frequency: ${isRepeated ? "Repeated meal" : "First time trying"}
- Status: ${isFavorite ? "Favorite meal" : "Not a favorite yet"}
${ingredients.length ? `- Ingredients: ${ingredients.join(", ")}` : ""}
${mealTime ? `- Time: ${mealTime}` : ""}

Requirements:
1. Make it personal and specific to this meal
2. Reference their current mood
3. Include positive encouragement
4. Use a friendly tone
5. Include 1-2 relevant emojis
6. Make it 2-3 sentences long
7. Make it different from these recent comments: ${recentComments
          .slice(0, 3)
          .join(" | ")}

Response Format: Provide only the comment, no additional text or formatting.`,
      },
    ];

    // Generate comment using Gemini with streaming disabled for faster response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: promptParts }],
    });

    const comment = result.response.text().trim();
    await storeRecentComment(comment);

    return comment;
  } catch (error) {
    console.error("Error generating AI comment:", error);
    return "Looks delicious! Hope you enjoy your meal! 😊";
  }
};

// Modern database setup
export const setupDatabase = async (): Promise<void> => {
  try {
    await executeQuery(
      db,
      `CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meal_name TEXT NOT NULL,
        mood TEXT NOT NULL,
        is_healthy INTEGER NOT NULL,
        is_favorite INTEGER DEFAULT 0,
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ingredients TEXT,
        meal_time TEXT
      )`
    );
  } catch (error) {
    console.error("Database setup error:", error);
  }
};

// Example of a modern React component using the system
/*
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { generateMealComment, setupDatabase } from './mealCommentGemini';

export const MealPost: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  
  useEffect(() => {
    setupDatabase();
  }, []);

  const handleMealPost = async () => {
    const mealData = {
      mealName: "Quinoa Buddha Bowl",
      mood: "energetic",
      isHealthy: true,
      ingredients: ["quinoa", "avocado", "chickpeas", "kale", "tahini"],
      mealTime: "lunch"
    };

    try {
      // Generate AI comment
      const aiComment = await generateMealComment(mealData);
      setComment(aiComment);
      
      // Save to database
      await executeQuery(
        db,
        `INSERT INTO meals (
          meal_name, mood, is_healthy, comment, ingredients, meal_time
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          mealData.mealName,
          mealData.mood,
          mealData.isHealthy ? 1 : 0,
          aiComment,
          JSON.stringify(mealData.ingredients),
          mealData.mealTime
        ]
      );
    } catch (error) {
      console.error('Error posting meal:', error);
    }
  };

  return (
    <View>
      <Button title="Post Meal" onPress={handleMealPost} />
      {comment && <Text>{comment}</Text>}
    </View>
  );
};
*/
