// App.js
import React, { useEffect } from "react";
import { View } from "react-native";
import { Provider } from "jotai";
import { AppState } from "react-native";
import { useMealSystem, useNotificationSetup } from "./mealSystem";
import { useAppState } from "@react-native-community/hooks";

const MealApp = () => {
  const { checkPendingComments, saveMeal } = useMealSystem();
  const setupNotifications = useNotificationSetup();
  const currentAppState = useAppState();

  useEffect(() => {
    setupNotifications();
    checkPendingComments();
  }, []);

  useEffect(() => {
    if (currentAppState === "active") {
      checkPendingComments();
    }
  }, [currentAppState]);

  const handleNewMealPost = async (imageUri) => {
    try {
      await saveMeal(imageUri);
      // Success! Comment will be generated later
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  return <View>{/* Your app UI */}</View>;
};

export default function App() {
  return (
    <Provider>
      <MealApp />
    </Provider>
  );
}
