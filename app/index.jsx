import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GroceriesPage from "./Pages/GroceriesPage";
import Home from "./Pages/Home";
import Login, { Login1, Login2 } from "./Pages/Login";
import LoginPage from "./Pages/LoginPage";
import MealPlanPage from "./Pages/MealPlanPage";
import Onboarding, {
  Onboard1,
  Onboard2,
  Onboard3,
  Onboard4,
} from "./Pages/Onboarding";
import OnboardPage from "./Pages/Onboardpage";
import RecipePage from "./Pages/RecipePage";
import SettingsPage from "./Pages/SettingsPage";
import { Detailedfoodlist } from "./Components/FoodCard";
import MealCard from "./Components/MealCard";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade", // Use fade animation for screen transitions
      }}>
      <Stack.Screen name="Onboard" component={OnboardPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
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
      <Stack.Screen name="Login1" component={Login1} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Login2" component={Login2} />
      <Stack.Screen name="Detailedfoodlist" component={Detailedfoodlist} />
      <Stack.Screen name="MealCard" component={MealCard} />
    </Stack.Navigator>
  );
}
