import React from "react";
import { Text, View } from "react-native";
import FoodCards, { FoodCard2 } from "../Components/FoodCard";
import ImportTab from "../Components/ImportTab";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import { useTheme } from '../theme.jsx';

const Home = React.memo(() => {
  const { theme } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
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
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primaryText, paddingHorizontal: 16 }}>Most Rated Recipes</Text>
      </View>

      <FoodCard2 />
      <View>
        <ImportTab currentPage="Home" />
      </View>
    </View>
  );
});

export default Home;
