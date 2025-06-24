import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "expo-router";

const ImportTab = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between p-6 relative">
      <TouchableOpacity className="items-center"onPress={() => navigation.navigate("Home")} >
        <Foundation name="home" size={30} color="#003A00" />
        <Text className="text-sm mt-2 text-[#003A00]">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center mr-4" onPress={() => navigation.navigate("Recipe")}>
        <Ionicons name="receipt-outline" size={30} color="#003A00" />
        <Text className="text-sm mt-2 text-[#003A00]">Receipts</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center absolute  -top-8 left-[55%] transform -translate-x-[50%]" >
        <Ionicons name="add-circle-sharp" size={70} color="#003A00" />
        <Text className="text-sm  text-[#003A00]">Add</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center ml-4" onPress={() => navigation.navigate("MealPlan")}>
        <MaterialIcons name="schedule" size={30} color="#003A00" />
        <Text className="text-sm mt-2 text-[#003A00]">Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center" onPress={() => navigation.navigate("Groceries")}>
        <MaterialIcons name="local-grocery-store" size={30} color="#003A00" />
        <Text className="text-sm mt-2 text-[#003A00]">Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImportTab;