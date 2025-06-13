import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity className="bg-[#008000] px-[32%] py-3 rounded-full  mt-4" onPress={onPress}>
      <Text className="text-white text-lg font-semibold text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
