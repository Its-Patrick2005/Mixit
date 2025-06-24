import React from "react";
import { Text, View } from "react-native";
import FoodCards, { FoodCard2 } from "../Components/FoodCard";
import Navbar from "../Components/Navbar";
import ImportTab from "../Components/ImportTab";

const Home = () => {
  return (
    <View className="bg-[#D9ECD9] flex-1">
      <View className="mb-4">
        <Navbar />
      </View>
      <View>
        <FoodCards />
      </View>
      <View className="py-4 ">
        <Text className="text-2xl font-bold text-[#003A00] px-4">Most Rated Recipes</Text>
      </View>

      <FoodCard2 />
      <View>
        <ImportTab />
      </View>
    </View>
  );
};

export default Home;
