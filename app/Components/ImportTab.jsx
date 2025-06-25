import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ImportTab = ({ currentPage = "Home" }) => {
  const navigation = useNavigation();

  const getTabStyle = (pageName) => {
    const isActive = currentPage === pageName;
    return {
      container: `items-center ${isActive ? 'scale-110' : ''}`,
      icon: isActive ? "#008000" : "#003A00",
      text: `text-sm mt-2 ${isActive ? 'text-[#008000] font-bold' : 'text-[#003A00]'}`
    };
  };

  return (
    <View className="flex-row justify-between p-6 relative">
      <TouchableOpacity 
        className={getTabStyle("Home").container}
        onPress={() => navigation.navigate("Home")} 
      >
        <Foundation name="home" size={30} color={getTabStyle("Home").icon} />
        <Text className={getTabStyle("Home").text}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={getTabStyle("Recipe").container}
        onPress={() => navigation.navigate("Recipe")}
      >
        <Ionicons name="receipt-outline" size={30} color={getTabStyle("Recipe").icon} />
        <Text className={getTabStyle("Recipe").text}>Receipts</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center absolute -top-8 left-[55%] transform -translate-x-[50%]" >
        <Ionicons name="add-circle-sharp" size={70} color="#003A00" />
        <Text className="text-sm text-[#003A00]">Add</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={getTabStyle("MealPlan").container}
        onPress={() => navigation.navigate("MealPlan")}
      >
        <MaterialIcons name="schedule" size={30} color={getTabStyle("MealPlan").icon} />
        <Text className={getTabStyle("MealPlan").text}>Schedule</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={getTabStyle("Groceries").container}
        onPress={() => navigation.navigate("Groceries")}
      >
        <MaterialIcons name="local-grocery-store" size={30} color={getTabStyle("Groceries").icon} />
        <Text className={getTabStyle("Groceries").text}>Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImportTab;