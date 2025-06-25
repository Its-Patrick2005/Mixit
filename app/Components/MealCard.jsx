import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const MealCard = ({ route, navigation }) => {
  const { food } = route.params;
  const screenHeight = Dimensions.get("window").height;
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [createCookbookModalVisible, setCreateCookbookModalVisible] = useState(false);
  const [newCookbookName, setNewCookbookName] = useState("");

  // Load cookbooks from AsyncStorage on component mount
  useEffect(() => {
    loadCookbooks();
  }, []);

  const loadCookbooks = async () => {
    try {
      const savedCookbooks = await AsyncStorage.getItem('cookbooks');
      if (savedCookbooks) {
        setCookbooks(JSON.parse(savedCookbooks));
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

  // Function to add recipe to cookbook
  const addToCookbook = (cookbookIndex) => {
    const currentCookbook = cookbooks[cookbookIndex];
    
    // Check if the food is already in the cookbook
    const isAlreadyAdded = currentCookbook.recipes.some(
      (recipe) => recipe.name.toLowerCase() === food.name.toLowerCase()
    );

    if (isAlreadyAdded) {
      Alert.alert('Already Added', `${food.name} is already in ${currentCookbook.title}!`);
      setImportModalVisible(false);
      return;
    }

    const updatedCookbooks = [...cookbooks];
    updatedCookbooks[cookbookIndex].recipes.push({
      name: food.name,
      image: food.image,
    });
    setCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    setImportModalVisible(false);
    Alert.alert('Success', `${food.name} has been added to ${cookbooks[cookbookIndex].title}!`);
  };

  // Function to create a new cookbook
  const createNewCookbook = () => {
    if (newCookbookName.trim()) {
      const newCookbook = {
        title: newCookbookName.trim(),
        recipes: [{
          name: food.name,
          image: food.image,
        }]
      };
      const updatedCookbooks = [...cookbooks, newCookbook];
      setCookbooks(updatedCookbooks);
      saveCookbooks(updatedCookbooks);
      setCreateCookbookModalVisible(false);
      setNewCookbookName("");
      Alert.alert('Success', `${food.name} has been added to your new cookbook "${newCookbookName.trim()}"!`);
    } else {
      Alert.alert('Error', 'Please enter a valid cookbook name.');
    }
  };

  const Card = ({ children }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {children}
    </View>
  );

  return (
    <ScrollView
      className="bg-[#D9ECD9] flex-1 py-[10%] px-3"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Back Button */}
       <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-4 ">
          <AntDesign name="left" size={24} color="#008000" />
          <Text style={{ fontSize: 18, color: "#008000" }}>Back</Text>
        </TouchableOpacity>

      {/* Food Image */}
      <View
        style={{
          height: screenHeight * 0.35,
          position: "relative",
          overflow: "hidden",
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Image
          source={{ uri: food.image }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
        {/* Gradient overlay for better text readability */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 58, 0, 0.3)",
          }}
        />
        
        {/* Food name with enhanced styling */}
        <View style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          paddingBottom: 25,
        }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#ffffff",
              textShadowColor: "rgba(0, 0, 0, 0.8)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
              lineHeight: 32,
            }}
          >
            {food.name}
          </Text>
          
          {/* Rating badge */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#003A00', marginRight: 4 }}>
              ⭐ {food.rating}
            </Text>
          </View>
        </View>

        {/* Decorative corner accent */}
        <View style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <Image
            source={require("../../assets/images/Asset 4.png")}
            style={{ width: 40, height: 40, resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* Rating and Import Button */}
      <View style={{ padding: 20, paddingBottom: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: '#003A00', fontWeight: '600' }}>
            Ready to cook? 
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (cookbooks.length === 0) {
              setCreateCookbookModalVisible(true);
            } else {
              setImportModalVisible(true);
            }
          }}
          style={{
            backgroundColor: '#008000',
            padding: 10,
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Ionicons name="add-circle" size={18} color="white" />
          <Text style={{ color: 'white', marginLeft: 6, fontSize: 14, fontWeight: 'bold' }}>
            Save Recipe
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ingredients Section */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ backgroundColor: '#008000', padding: 8, borderRadius: 20, marginRight: 10 }}>
            <Ionicons name="restaurant" size={20} color="white" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#003A00" }}>
            Ingredients
          </Text>
        </View>
        <View style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#008000',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          {Array.isArray(food.ingredients) ? (
            food.ingredients.map((item, index) => (
              <View key={index} style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 8,
                paddingVertical: 4,
              }}>
                <View style={{ 
                  backgroundColor: '#008000', 
                  width: 6, 
                  height: 6, 
                  borderRadius: 3, 
                  marginRight: 12 
                }} />
                <Text style={{ fontSize: 16, color: '#333', flex: 1 }}>
                  {item}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: '#333' }}>{food.ingredients}</Text>
          )}
        </View>
      </View>

      {/* Method Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ backgroundColor: '#008000', padding: 8, borderRadius: 20, marginRight: 10 }}>
            <Ionicons name="list" size={20} color="white" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#003A00" }}>
            Method
          </Text>
        </View>
        <View style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#008000',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          {Array.isArray(food.method) ? (
            food.method.map((step, index) => (
              <View key={index} style={{ 
                flexDirection: 'row', 
                marginBottom: 12,
                alignItems: 'flex-start',
              }}>
                <View style={{
                  backgroundColor: '#008000',
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  marginTop: 2,
                }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, color: '#333', flex: 1, lineHeight: 22 }}>
                  {step}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: '#333' }}>{food.method}</Text>
          )}
        </View>
      </View>

      {/* Fun Fact Section */}
      {food.funFact && (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ backgroundColor: '#008000', padding: 8, borderRadius: 20, marginRight: 10 }}>
              <Ionicons name="bulb" size={20} color="white" />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#003A00" }}>
              Fun Fact
            </Text>
          </View>
          <View style={{
            backgroundColor: '#e8f5e8',
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#008000',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>💡</Text>
              <Text style={{ fontSize: 16, color: '#003A00', flex: 1, lineHeight: 22, fontStyle: 'italic' }}>
                {food.funFact}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Import to Cookbook Modal */}
      <Modal visible={importModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '85%', maxHeight: '70%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              Add to Cookbook
            </Text>
            
            <ScrollView style={{ maxHeight: 300 }}>
              {cookbooks.map((cookbook, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => addToCookbook(index)}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="book" size={20} color="#003A00" />
                  <Text style={{ marginLeft: 8, fontSize: 16, flex: 1 }}>
                    {cookbook.title}
                  </Text>
                  <Text style={{ color: '#666', fontSize: 12 }}>
                    {cookbook.recipes.length} recipes
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                setImportModalVisible(false);
                setCreateCookbookModalVisible(true);
              }}
              style={{
                backgroundColor: '#008000',
                padding: 12,
                borderRadius: 8,
                marginTop: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Create New Cookbook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setImportModalVisible(false)}
              style={{
                padding: 12,
                marginTop: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#666' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Cookbook Modal */}
      <Modal visible={createCookbookModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '85%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              Create New Cookbook
            </Text>
            
            <TextInput
              placeholder="Enter cookbook name"
              value={newCookbookName}
              onChangeText={setNewCookbookName}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16,
              }}
            />

            <TouchableOpacity
              onPress={createNewCookbook}
              style={{
                backgroundColor: '#008000',
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Create Cookbook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCreateCookbookModalVisible(false);
                setNewCookbookName("");
              }}
              style={{
                padding: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#666' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MealCard;
