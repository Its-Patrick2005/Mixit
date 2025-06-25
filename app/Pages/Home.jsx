import React from "react";
import { Text, View } from "react-native";
import FoodCards, { FoodCard2 } from "../Components/FoodCard";
import ImportTab from "../Components/ImportTab";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";

const Home = React.memo(() => {
  return (
    <View className="bg-[#D9ECD9] flex-1">
      <View className="mb-4">
        <Navbar />
      </View>

      <View className="mb-4">
        <Search searchType="food" />
      </View>
      <View>
        <FoodCards />
      </View>
      <View className="py-4 ">
        <Text className="text-2xl font-bold text-[#003A00] px-4">Most Rated Recipes</Text>
      </View>

      <FoodCard2 />
      <View>
        <ImportTab currentPage="Home" />
      </View>
    </View>
  );
});

export default Home;
