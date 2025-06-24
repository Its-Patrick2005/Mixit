import React, { useState } from "react";
import { View, TouchableOpacity, Text, FlatList, ScrollView } from "react-native";
import { FoodCard3 } from "../Components/FoodCard";

const Recipe = () => {
  const [cookbookCards, setCookbookCards] = useState([]);

  const handleCreateCookbook = () => {
    setCookbookCards(prev => [...prev, {}]); // Add one card
  };

  return (
    <ScrollView className="bg-[#D9ECD9] pt-10" contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Initial Two Cards Side by Side */}
      <View className="flex-row justify-between mb-4">
        <FoodCard3 />
      
      </View>

      {/* Dynamic Cards Grid */}
      <FlatList
        data={cookbookCards}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={() => (
          <View style={{ marginBottom: 16 }}>
            <FoodCard3 />
          </View>
        )}
        scrollEnabled={false} // disables FlatList's internal scroll
        nestedScrollEnabled={false}
      />

      {/* Create Cookbook Button */}
      <TouchableOpacity
        className="bg-[#003A00] py-3 px-4 rounded-xl mt-4 mb-10"
        onPress={handleCreateCookbook}
      >
        <Text className="text-white font-semibold text-center">Create Cookbook</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Recipe;
