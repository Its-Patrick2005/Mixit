import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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

  const handleDeleteCookbook = (index) => {
    setCookbooks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteRecipe = (cookbookIndex, recipeIndex) => {
    setCookbooks((prev) => {
      const updated = [...prev];
      updated[cookbookIndex].recipes = updated[cookbookIndex].recipes.filter((_, i) => i !== recipeIndex);
      return updated;
    });
  };

  // Group cookbooks into rows of two
  const groupedCookbooks = [];
  for (let i = 0; i < cookbooks.length; i += 2) {
    groupedCookbooks.push(cookbooks.slice(i, i + 2));
  }

  return (
    <ScrollView
      className="bg-[#D9ECD9] pt-10 px-3"
      contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Cookbooks Grid in Rows of 2 */}
      {groupedCookbooks.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between ">
          {row.map((cookbook, index) => {
            const realIndex = rowIndex * 2 + index;
            return (
              <View key={realIndex} className="relative w-[48%] mb-4">
                <FoodCard3
                  cardName={cookbook.title}
                  text={`${cookbook.recipes.length} Recipes`}
                  image={cookbook.recipes.slice(0, 3).map((r) => r.image)}
                  onPress={() =>
                    navigation.navigate("Recipe3", {
                      recipes: cookbook.recipes,
                      cookbookTitle: cookbook.title,
                      cookbookIndex: realIndex,
                      setCookbooks,
                      cookbooks,
                    })
                  }
                  onLongPress={() => {
                    Alert.alert(
                      'Delete Cookbook',
                      `Are you sure you want to delete "${cookbook.title}"?`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', style: 'destructive', onPress: () => handleDeleteCookbook(realIndex) },
                      ]
                    );
                  }}
                />
                <TouchableOpacity
                  className="absolute -top-2 left-2 z-10 bg-white rounded-full p-1 border border-[#003A00]"
                  onPress={() => {
                    setActiveCookbookIndex(realIndex);
                    setModalVisible(true);
                  }}>
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
        onPress={handleCreateCookbook}>
        <Ionicons name="add-circle-outline" size={24} color="#003A00" />
        <Text className="text-[#003A00] font-semibold text-center">
          Create Cookbook
        </Text>
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
          <TouchableOpacity
            className="bg-green-700 p-3 rounded mb-2"
            onPress={handleSubmit}>
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
  const navigation = useNavigation();
  const { recipes = [], cookbookTitle = "My Cookbook", cookbookIndex, setCookbooks } = route.params;

  // Helper to delete a recipe with confirmation
  const confirmDeleteRecipe = (idx) => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete "${recipes[idx]?.name}" from this cookbook?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          if (typeof cookbookIndex === 'number' && typeof setCookbooks === 'function') {
            setCookbooks((prev) => {
              const updated = [...prev];
              updated[cookbookIndex].recipes = updated[cookbookIndex].recipes.filter((_, i) => i !== idx);
              return updated;
            });
            navigation.goBack();
          }
        } },
      ]
    );
  };

  return (
    <ScrollView className="bg-[#D9ECD9] pt-10 px-4">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center mb-4 ">
        <AntDesign name="left" size={24} color="#008000" />
        <Text style={{ fontSize: 18, color: "#008000" }}>Back</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-4 text-[#003A00]">
        {cookbookTitle}
      </Text>
      {recipes.map((recipe, idx) => {
        const fullData = foodList.find(
          (item) => item.name.toLowerCase() === recipe.name.toLowerCase()
        );
        if (!fullData) return null;
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate("MealCard", { food: fullData })}
            onLongPress={() => confirmDeleteRecipe(idx)}
            className="bg-white mb-4 rounded-xl border border-[#003A00]">
            <Image
              source={{ uri: fullData.image }}
              className="w-full h-40 rounded-lg mb-1"
              resizeMode="cover"
            />
            <Text className="text-[#003A00] font-semibold text-xl px-2 pb-2">
              {fullData.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Recipe;
