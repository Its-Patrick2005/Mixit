import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              navigation.navigate("Onboard");
            } catch (error) {
              console.log('Error logging out:', error);
              navigation.navigate("Onboard");
            }
          }
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#D9ECD9] pt-10 px-4">
      <Text className="text-2xl font-bold text-[#003A00] mb-6">Settings</Text>
      
      <TouchableOpacity
        className="bg-red-500 p-4 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings