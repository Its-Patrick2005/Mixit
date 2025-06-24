import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  TextInput,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FoodCard3 } from "../Components/FoodCard";
import foodList from "../FoodData";

// ============ Recipe Screen ============
const Recipe = () => {
  const [cookbooks, setCookbooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCookbookIndex, setActiveCookbookIndex] = useState(null);
  const navigation = useNavigation();

  const handleCreateCookbook = () => {
    const newCookbook = {
      title: `Cookbook ${cookbooks.length + 1}`,
      recipes: [],
    };
    setCookbooks((prev) => [...prev, newCookbook]);
  };

  const handleAddRecipe = (foodName) => {
    const found = foodList.find(
      (item) => item.name.toLowerCase() === foodName.trim().toLowerCase()
    );

    if (!found || activeCookbookIndex === null) {
      alert("Food not found.");
      return;
    }

    const updatedCookbooks = [...cookbooks];
    updatedCookbooks[activeCookbookIndex].recipes.push({
      name: found.name,
      image: found.image,
    });

    setCookbooks(updatedCookbooks);
    setModalVisible(false);
  };

  // Group cookbooks into rows of two
  const groupedCookbooks = [];
  for (let i = 0; i < cookbooks.length; i += 2) {
    groupedCookbooks.push(cookbooks.slice(i, i + 2));
  }

  return (
    <ScrollView className="bg-[#D9ECD9] pt-10 px-3" contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Cookbooks Grid in Rows of 2 */}
      {groupedCookbooks.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mb-6">
          {row.map((cookbook, index) => {
            const realIndex = rowIndex * 2 + index;
            return (
              <View key={realIndex} className="relative w-[48%]">
                <FoodCard3
                  cardName={cookbook.title}
                  text={`${cookbook.recipes.length} Recipes`}
                  image={cookbook.recipes.slice(0, 3).map((r) => r.image)}
                  onPress={() =>
                    navigation.navigate("Recipe3", {
                      recipes: cookbook.recipes,
                      cookbookTitle: cookbook.title,
                    })
                  }
                />
                <TouchableOpacity
                  className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 border border-[#003A00]"
                  onPress={() => {
                    setActiveCookbookIndex(realIndex);
                    setModalVisible(true);
                  }}
                >
                  <Ionicons name="add" size={20} color="#003A00" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}

      {/* Create New Cookbook */}
      <TouchableOpacity
        className="bg-[#D9ECD9] py-10 w-[40%] px-4 rounded-xl mt-4 ml-2 mb-10 border-2 border-[#003A00] items-center"
        onPress={handleCreateCookbook}
      >
        <Ionicons name="add-circle-outline" size={24} color="#003A00" />
        <Text className="text-[#003A00] font-semibold text-center">Create Cookbook</Text>
      </TouchableOpacity>

      {/* Add Recipe Modal */}
      <Recipe2
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setActiveCookbookIndex(null);
        }}
        onAddRecipe={handleAddRecipe}
      />
    </ScrollView>
  );
};

// ============ Modal Dialog ============
export const Recipe2 = ({ visible, onClose, onAddRecipe }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim()) {
      onAddRecipe(query.trim());
      setQuery("");
    } else {
      alert("Please enter a food name.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-xl w-[85%]">
          <Text className="text-lg font-bold mb-4">Add a Food</Text>
          <TextInput
            placeholder="Food Name (e.g., Jollof Rice)"
            value={query}
            onChangeText={setQuery}
            className="border mb-4 p-2 rounded"
          />
          <TouchableOpacity className="bg-green-700 p-3 rounded mb-2" onPress={handleSubmit}>
            <Text className="text-white text-center">Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-center text-red-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ============ Recipe3 ============
export const Recipe3 = () => {
  const route = useRoute();
  const { recipes = [], cookbookTitle = "My Cookbook" } = route.params;

  return (
    <ScrollView className="bg-[#D9ECD9] pt-10 px-4">
      <Text className="text-2xl font-bold mb-4 text-[#003A00]">{cookbookTitle}</Text>
      {recipes.map((recipe, idx) => (
        <View key={idx} className="bg-white mb-4 p-4 rounded-xl border border-[#003A00]">
          <Image
            source={{ uri: recipe.image }}
            className="w-full h-40 rounded-lg mb-2"
            resizeMode="cover"
          />
          <Text className="text-[#003A00] font-semibold">{recipe.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Recipe;
