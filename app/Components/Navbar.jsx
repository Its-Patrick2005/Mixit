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
        style={{ width: "25%", aspectRatio: 1, alignSelf: "center" }}
      >
        <Image
          source={require("../../assets/images/Logo.png")}
          className="w-full h-full object-cover"
        />
      </TouchableOpacity>

      {/* Right profile image */}
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "20%", aspectRatio: 1, alignSelf: "center" }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/83/b2/00/83b200e8a7b0c8d1d9a40669ad72dd45.jpg",
          }}
          className="w-full h-full object-cover"
        />
      </View>
    </View>
  );
};

export default Navbar;
