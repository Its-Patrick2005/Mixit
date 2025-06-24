import { useNavigation } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View className="mt-[15%] flex-row justify-between px-4">
      {/* Touchable logo that navigates to Home */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="rounded-full overflow-hidden"
        style={{ width: "25%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right profile image */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Sidebar")}
        className="rounded-full overflow-hidden"
        style={{ width: "25%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Logo.png")}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
