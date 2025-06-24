import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GetToKnowUs = ({ name, icon, selectedOptions, setSelectedOptions }) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    const isSelected = selectedOptions.includes(name);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((option) => option !== name));
    } else {
      setSelectedOptions([...selectedOptions, name]);
    }
  };

  React.useEffect(() => {
    setIsActive(selectedOptions.includes(name));
  }, [selectedOptions, name]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isPressed || isActive ? "#388E3C" : "#B0D8B0",
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 80,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: isPressed || isActive ? 4 : 1 },
        shadowOpacity: isPressed || isActive ? 0.25 : 0.1,
        shadowRadius: isPressed || isActive ? 6 : 2,
        marginVertical: 2,
        minWidth: 200,
        elevation: isPressed || isActive ? 6 : 2,
        transform: [{ translateY: isPressed || isActive ? 2 : 0 }],
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}>
      {icon && <View style={{ marginRight: 12 }}>{icon}</View>}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: isPressed || isActive ? "#fff" : "#222",
        
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default GetToKnowUs;
