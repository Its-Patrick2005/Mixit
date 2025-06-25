import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
const Recipe = ({ cookbooks = [], setCookbooks = () => {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cookbookNameModalVisible, setCookbookNameModalVisible] = useState(false);
  const [activeCookbookIndex, setActiveCookbookIndex] = useState(null);
  const [localCookbooks, setLocalCookbooks] = useState([]);
  const navigation = useNavigation();

  // Load cookbooks from AsyncStorage on component mount
  useEffect(() => {
    loadCookbooks();
  }, []);

  // Add focus listener to reload cookbooks when returning to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCookbooks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadCookbooks = async () => {
    try {
      const savedCookbooks = await AsyncStorage.getItem('cookbooks');
      if (savedCookbooks) {
        const parsedCookbooks = JSON.parse(savedCookbooks);
        setLocalCookbooks(parsedCookbooks);
        if (setCookbooks) {
          setCookbooks(parsedCookbooks);
        }
      }
    } catch (error) {
      console.log('Error loading cookbooks:', error);
    }
  };

  const saveCookbooks = async (updatedCookbooks) => {
    try {
      await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
    } catch (error) {
      console.log('Error saving cookbooks:', error);
    }
  };

  const handleCreateCookbook = () => {
    setCookbookNameModalVisible(true);
  };

  const handleConfirmCreateCookbook = (cookbookName) => {
    if (cookbookName.trim()) {
      const newCookbook = {
        title: cookbookName.trim(),
        recipes: [],
      };
      const updatedCookbooks = [...localCookbooks, newCookbook];
      setLocalCookbooks(updatedCookbooks);
      saveCookbooks(updatedCookbooks);
      if (setCookbooks) {
        setCookbooks(updatedCookbooks);
      }
      setCookbookNameModalVisible(false);
    } else {
      alert("Please enter a cookbook name.");
    }
  };

  const handleAddRecipe = (foodName) => {
    const found = foodList.find(
      (item) => item.name.toLowerCase() === foodName.trim().toLowerCase()
    );

    if (!found || activeCookbookIndex === null) {
      alert("Food not found.");
      return;
    }

    // Check if the food is already in the cookbook
    const currentCookbook = localCookbooks[activeCookbookIndex];
    const isAlreadyAdded = currentCookbook.recipes.some(
      (recipe) => recipe.name.toLowerCase() === found.name.toLowerCase()
    );

    if (isAlreadyAdded) {
      alert(`${found.name} is already added to this cookbook!`);
      setModalVisible(false);
      return;
    }

    const updatedCookbooks = [...localCookbooks];
    updatedCookbooks[activeCookbookIndex].recipes.push({
      name: found.name,
      image: found.image,
    });

    setLocalCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    if (setCookbooks) {
      setCookbooks(updatedCookbooks);
    }
    setModalVisible(false);
    alert(`${found.name} has been added to ${currentCookbook.title}!`);
  };

  const handleDeleteCookbook = (index) => {
    const updatedCookbooks = localCookbooks.filter((_, i) => i !== index);
    setLocalCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    if (setCookbooks) {
      setCookbooks(updatedCookbooks);
    }
  };

  const handleDeleteRecipe = (cookbookIndex, recipeIndex) => {
    const updatedCookbooks = [...localCookbooks];
    updatedCookbooks[cookbookIndex].recipes = updatedCookbooks[cookbookIndex].recipes.filter((_, i) => i !== recipeIndex);
    setLocalCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    if (setCookbooks) {
      setCookbooks(updatedCookbooks);
    }
  };

  // Group cookbooks into rows of two
  const groupedCookbooks = [];
  for (let i = 0; i < localCookbooks.length; i += 2) {
    groupedCookbooks.push(localCookbooks.slice(i, i + 2));
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

      {/* Cookbook Name Modal */}
      <CookbookNameModal
        visible={cookbookNameModalVisible}
        onClose={() => setCookbookNameModalVisible(false)}
        onConfirm={handleConfirmCreateCookbook}
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
  const { recipes = [], cookbookTitle = "My Cookbook", cookbookIndex } = route.params;
  
  // Add state to manage recipes locally
  const [localRecipes, setLocalRecipes] = useState(recipes);

  // Update local recipes when route params change
  useEffect(() => {
    setLocalRecipes(recipes);
  }, [recipes]);

  // Helper to delete a recipe with confirmation
  const confirmDeleteRecipe = async (idx) => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete "${localRecipes[idx]?.name}" from this cookbook?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              const savedCookbooks = await AsyncStorage.getItem('cookbooks');
              if (savedCookbooks && typeof cookbookIndex === 'number') {
                const cookbooks = JSON.parse(savedCookbooks);
                const updatedCookbooks = [...cookbooks];
                updatedCookbooks[cookbookIndex].recipes = updatedCookbooks[cookbookIndex].recipes.filter((_, i) => i !== idx);
                await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
                
                // Update local state immediately
                setLocalRecipes(updatedCookbooks[cookbookIndex].recipes);
              }
            } catch (error) {
              console.log('Error deleting recipe:', error);
            }
          }
        },
      ]
    );
  };

  // Group recipes into rows of two
  const groupedRecipes = [];
  for (let i = 0; i < localRecipes.length; i += 2) {
    groupedRecipes.push(localRecipes.slice(i, i + 2));
  }

  return (
    <ScrollView className="bg-[#D9ECD9] pt-10 px-3">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center mb-4">
        <AntDesign name="left" size={24} color="#008000" />
        <Text style={{ fontSize: 18, color: "#008000" }}>Back</Text>
      </TouchableOpacity>
      
      <Text className="text-2xl font-bold mb-6 text-[#003A00] px-2">
        {cookbookTitle}
      </Text>

      {/* Recipes Grid in Rows of 2 */}
      {groupedRecipes.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mb-4">
          {row.map((recipe, index) => {
            const realIndex = rowIndex * 2 + index;
            const fullData = foodList.find(
              (item) => item.name.toLowerCase() === recipe.name.toLowerCase()
            );
            
            if (!fullData) return null;
            
            return (
              <View key={realIndex} className="relative w-[48%]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("MealCard", { 
                    food: {
                      id: fullData.id,
                      name: fullData.name,
                      image: fullData.image,
                      rating: fullData.rating,
                      ingredients: fullData.ingredients,
                      method: fullData.method,
                      funFact: fullData.funFact
                    }
                  })}
                  onLongPress={() => confirmDeleteRecipe(realIndex)}
                  style={{
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#003A00",
                    overflow: "hidden",
                    shadowColor: "#003A00",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 12,
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: fullData.image }}
                    style={{ width: "100%", height: 160, resizeMode: "cover" }}
                  />
                  
                  {/* Gradient overlay for better text readability */}
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      backgroundColor: "rgba(0, 58, 0, 0.4)",
                    }}
                  />
                  
                  {/* Text overlay at bottom */}
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 12,
                    }}
                  >
                    <Text style={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: 14,
                      textAlign: "center",
                      lineHeight: 18,
                      textShadowColor: "rgba(0, 0, 0, 0.8)",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 2,
                    }}>
                      {fullData.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                
                {/* Delete indicator on long press */}
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center opacity-0">
                  <AntDesign name="delete" size={12} color="white" />
                </View>
              </View>
            );
          })}
        </View>
      ))}

      {/* Empty state */}
      {localRecipes.length === 0 && (
        <View className="flex-1 items-center justify-center py-20">
          <Ionicons name="book-outline" size={80} color="#003A00" />
          <Text className="text-[#003A00] text-lg font-semibold mt-4 text-center">
            No recipes yet
          </Text>
          <Text className="text-[#003A00] text-sm mt-2 text-center opacity-70">
            Add some recipes to your cookbook!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// ============ Cookbook Name Modal ============
const CookbookNameModal = ({ visible, onClose, onConfirm }) => {
  const [cookbookName, setCookbookName] = useState("");

  const handleSubmit = () => {
    if (cookbookName.trim()) {
      onConfirm(cookbookName);
      setCookbookName("");
    } else {
      alert("Please enter a cookbook name.");
    }
  };

  const handleClose = () => {
    setCookbookName("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-xl w-[85%]">
          <Text className="text-lg font-bold mb-4">Create New Cookbook</Text>
          <TextInput
            placeholder="Enter cookbook name (e.g., My Favorite Recipes)"
            value={cookbookName}
            onChangeText={setCookbookName}
            className="border mb-4 p-3 rounded border-gray-300"
            autoFocus={true}
          />
          <TouchableOpacity
            className="bg-green-700 p-3 rounded mb-2"
            onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold">Create Cookbook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-center text-red-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Recipe;
