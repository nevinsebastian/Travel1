import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./components/AuthScreen"; // Import the AuthScreen component
import HomeScreen from "./components/HomeScreen";
import BookingScreen from "./components/BookingScreen"; // Import the BookingScreen component

const Stack = createStackNavigator();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
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
          component={BookingScreen} // Add BookingScreen as a screen
          options={{ title: 'Book Program' }} // Set the screen title
        />
        {/* Add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
