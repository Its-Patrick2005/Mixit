import React, { useState } from "react";
import { View } from "react-native";
import ImportTab from "../Components/ImportTab";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Recipe from "./Recipe";

const RecipePage = ({ navigation }) => {
  const [cookbooks, setCookbooks] = useState([]);

  return (
    <View className="bg-[#D9ECD9] flex-1 relative">
      <Navbar />

      <Search searchType="cookbooks" cookbooks={cookbooks} setCookbooks={setCookbooks} />

      <Recipe cookbooks={cookbooks} setCookbooks={setCookbooks} />

      <ImportTab currentPage="Recipe" />

    </View>
  );
};

export default RecipePage;
