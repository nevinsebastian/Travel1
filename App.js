import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./components/AuthScreen";
import HomeScreen from "./components/HomeScreen";
import BookingScreen from "./components/BookingScreen";
import TimeSlotSelection from "./components/TimeSlotSelection";
import * as Font from "expo-font";

const Stack = createStackNavigator();

async function loadFonts() {
  await Font.loadAsync({
    "HankenGrotesk-Black": require("./assets/fonts/HankenGrotesk-Black.ttf"),
    // You can add more font styles if needed
  });
}

function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => {
        setFontLoaded(true);
      })
      .catch((error) => {
        console.warn("Font loading error", error);
      });
  }, []);

  if (!isFontLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: "Book Program" }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Authentication" }}
        />
        <Stack.Screen
        name="TimeSlotSelection"
        component={TimeSlotSelection}
        />
        {/* Add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
