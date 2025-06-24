import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-[#008000] px-[32%] py-3 rounded-full mt-4"
      onPress={onPress}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text className="text-white text-lg font-semibold text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
