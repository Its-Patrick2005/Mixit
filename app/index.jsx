import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GroceriesPage from "./Pages/GroceriesPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import MealPlanPage from "./Pages/MealPlanPage";
import Onboarding, { Onboard1, Onboard2, Onboard3,Onboard4 } from "./Pages/Onboarding";
import OnboardPage from "./Pages/Onboardpage";
import RecipePage from "./Pages/RecipePage";
import SettingsPage from "./Pages/SettingsPage";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade", // Use fade animation for screen transitions
      }}
    >
      <Stack.Screen name="Onboard" component={OnboardPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Groceries" component={GroceriesPage} />
      <Stack.Screen name="MealPlan" component={MealPlanPage} />
      <Stack.Screen name="Recipe" component={RecipePage} />
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="Onboard1" component={Onboard1} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Onboard2" component={Onboard2} />
      <Stack.Screen name="Onboard3" component={Onboard3} />
      <Stack.Screen name="Onboard4" component={Onboard4} />
    </Stack.Navigator>
  );
}
