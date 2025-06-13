import { useNavigation } from "@react-navigation/native";
// import { Video } from "expo-video";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../Components/Button";
const { width } = Dimensions.get("window");
const FRAME_WIDTH = width * 0.6;
const FRAME_HEIGHT = FRAME_WIDTH * 2;

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center py-[10%] bg-[#B0D8B0] px-3 ">
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Logo.png")}
          className="w-full h-full object-cover"
        />
      </View>

      <View>
        <Text className="text-2xl font-bold text-center">Welcome to Mixit</Text>
        <Text className="text-lg text-gray-500  text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente voluptatum. Blanditiis, numquam corporis exercitationem
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.container}>
          <Image
            style={styles.frame}
            resizeMode="contain"
            source={require("../../assets/images/Iphone.png")}
          />
        </View>
      </View>
      <Button
        title={"Get started"}
        onPress={() => navigation.navigate("Onboard1")}
      />
      <View className="mt-4 flex-row">
        <Text className="text-xl">Already have an account?</Text>
         <TouchableOpacity className="">
        <Text className="text-[#008000] text-xl"> Log in</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  video: {
    position: "absolute",
    width: FRAME_WIDTH * 0.88,
    height: FRAME_HEIGHT * 0.92,
    top: FRAME_HEIGHT * 0.04,
    left: FRAME_WIDTH * 0.06,
    borderRadius: 24,
    backgroundColor: "#ffffff",
  },
  frame: {
    position: "absolute",
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
  },
});

// Second login page 

export const Onboard1 = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center">
      <Text onPress={() => navigation.navigate("Onboarding")}>Onboard1</Text>
    </View>
  );
};

export default Onboarding;




