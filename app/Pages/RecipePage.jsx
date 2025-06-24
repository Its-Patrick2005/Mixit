import React from "react";
import { View } from "react-native";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Recipe from "../Pages/Recipe";

const RecipePage = ({ navigation }) => {
  return (
    <View className="bg-[#D9ECD9] flex-1 relative">
      <Navbar />

      <Search />

      <Recipe />
    </View>
  );
};

export default RecipePage;
