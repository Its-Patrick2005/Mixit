import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import foodList from "../FoodData";
import { Fontisto } from "@expo/vector-icons";

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFood = foodList.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="bg-[#D9ECD9] pt-10">
      {/* Search Input with Icon */}
      <View className="mx-4 mb-4 relative">
        <TextInput
          className="bg-white border border-[#003A00] rounded-lg pl-10 pr-4 py-3 text-base"
          placeholder="Search for food..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Fontisto
          name="search"
          size={18}
          color="#003A00"
          style={{
            position: "absolute",
            top: 14,
            left: 12,
          }}
        />
      </View>

      {/* Food List */}
      {searchQuery.trim() !== "" && (
        <ScrollView
          style={{ maxHeight: 600 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredFood.map((food) => (
            <TouchableOpacity
              key={food.id}
              className="bg-white border border-[#003A00] rounded-lg p-4 mb-4 mx-4"
              onPress={() => navigation.navigate("Detailedfoodlist", { food })}
            >
              <View className="flex-row items-center">
                <Image
                  source={{ uri: food.image }}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <View>
                  <Text className="text-lg font-semibold">{food.name}</Text>
                  <Text className="text-gray-500">{food.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Search;
