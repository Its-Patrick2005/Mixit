import { useNavigation } from "@react-navigation/native";
// import { Video } from "expo-video";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../Components/Button";
import GetToKnowUs from "../Components/GetToKnowUs";
import Review from "../Components/Review";
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
  const reviews = [
    {
      name: "Sarah J.",
      text: "Mixit made cooking so much easier! The recipes are simple and delicious.",
      rating: 5,
    },
    {
      name: "Mike T.",
      text: "I love the step-by-step guides. My family enjoys every meal I make now.",
      rating: 4,
    },
    {
      name: "Priya S.",
      text: "Great app for beginners and pros alike. Highly recommended!",
      rating: 5,
    },
    {
      name: "Carlos R.",
      text: "The grocery list feature saves me so much time. Thank you Mixit!",
      rating: 4,
    },
    {
      name: "Emily W.",
      text: "Beautiful design and easy to use. My go-to cooking app.",
      rating: 5,
    },
  ];
  const flatListRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % reviews.length;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 2000); // Faster interval, but still smooth animation
    return () => clearInterval(interval);
  });

  return (
    <View className="flex-1 items-center py-[10%] bg-[#D9ECD9] px-3 ">
      {/* Loading Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Logo.png")}
            className="w-full h-full object-cover"
          />
        </View>
        <View className="bg-white w-80 h-3 relative rounded-[30px] overflow-hidden mt-3">
          <View className="absolute bg-[#008000] w-20 h-3 rounded-[30px] " />
        </View>
      </View>

      {/* loading Header */}

      <View className="mt-10">
        <Text className="text-center text-xl font-bold capitalize">
          WE HAVE HELPED 5+ MILLION COOKS
        </Text>
        <Text className="text-center mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente voluptatum. Blanditiis, numquam corporis exercitationem
        </Text>
      </View>

      <View style={{ height: 360, marginVertical: 20 }}>
        <FlatList
          ref={flatListRef}
          data={reviews}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <Review name={item.name} text={item.text} ratings={item.rating} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <Button
        title={"Continue"}
        onPress={() => navigation.navigate("Onboard2")}
      />
    </View>
  );
};

// Third login page

export const Onboard2 = () => {
  const navigation = useNavigation();
  const platforms = [
    {
      name: "YouTube",
      IconComponent: () => (
        <FontAwesome name="youtube-play" size={24} color="#FF0000" />
      ),
    },
    {
      name: "Instagram",
      IconComponent: () => (
        <FontAwesome name="instagram" size={24} color="#C13584" />
      ),
    },
    {
      name: "Google Search",
      IconComponent: () => (
        <FontAwesome name="google" size={24} color="#4285F4" />
      ),
    },
    {
      name: "TikTok",
      IconComponent: () => (
        <FontAwesome5 name="tiktok" size={24} color="#000000" />
      ),
    },
    {
      name: "Facebook",
      IconComponent: () => (
        <FontAwesome name="facebook" size={24} color="#1877F3" />
      ),
    },
    {
      name: "Other",
      IconComponent: null,
    },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  return (
    <View className="flex-1 items-center py-[10%] bg-[#D9ECD9] px-3 ">
      {/* Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Logo.png")}
            className="w-full h-full object-cover"
          />
        </View>
        <View className="bg-white w-80 h-3 relative rounded-[30px] overflow-hidden mt-3">
          <View className="absolute bg-[#008000] w-36 h-3 rounded-[30px] " />
        </View>
      </View>

      {/* page */}

      <View className="mt-10">
        <Text className="text-center text-xl font-bold capitalize">
          how did you hear about us
        </Text>
      </View>

      {/* List */}
      <View style={{ marginTop: 24 }}>
        {platforms.map((item, id) => (
          <View key={id} style={{ marginBottom: 16 }}>
            <GetToKnowUs
              name={item.name}
              icon={item.IconComponent ? <item.IconComponent /> : null}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </View>
        ))}
      </View>
      <Button
        title={"Continue"}
        onPress={() => navigation.navigate("Onboard3")}
      />
    </View>
  );
};

// fourth login page
export const Onboard3 = () => {
  const navigation = useNavigation();
  const platforms = [
    {
      name: "YouTube",
      IconComponent: () => (
        <FontAwesome name="youtube-play" size={24} color="#FF0000" />
      ),
    },
    {
      name: "Instagram",
      IconComponent: () => (
        <FontAwesome name="instagram" size={24} color="#C13584" />
      ),
    },
    {
      name: "Google Search",
      IconComponent: () => (
        <FontAwesome name="google" size={24} color="#4285F4" />
      ),
    },
    {
      name: "TikTok",
      IconComponent: () => (
        <FontAwesome5 name="tiktok" size={24} color="#000000" />
      ),
    },
    {
      name: "Facebook",
      IconComponent: () => (
        <FontAwesome name="facebook" size={24} color="#1877F3" />
      ),
    },
    {
      name: "Other",
      IconComponent: null,
    },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  return (
    <View className="flex-1 items-center py-[10%] bg-[#D9ECD9] px-3 ">
      {/* Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Logo.png")}
            className="w-full h-full object-cover"
          />
        </View>
        <View className="bg-white w-80 h-3 relative rounded-[30px] overflow-hidden mt-3">
          <View className="absolute bg-[#008000] w-60 h-3 rounded-[30px] " />
        </View>
      </View>

      {/* page */}

      <View className="mt-10">
        <Text className="text-center text-xl font-bold capitalize">
          where do you get your
        </Text>
        <Text className="text-center text-xl font-bold capitalize">
          recipes from
        </Text>
        <Text className="text-center mt-5 capitalize">Select all to apply</Text>
      </View>

      {/* List */}
      <View style={{ marginTop: 24 }}>
        {platforms.map((item, id) => (
          <View key={id} style={{ marginBottom: 16 }}>
            <GetToKnowUs
              name={item.name}
              icon={item.IconComponent ? <item.IconComponent /> : null}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </View>
        ))}
      </View>
      <Button
        title={"Continue"}
        onPress={() => navigation.navigate("Onboard4")}
      />
    </View>
  );
};

export const Onboard4 = () => {
  const [continueButtonVisible, setContinueButtonVisible] = useState(false);
  const spinValue = new Animated.Value(0);
  const navigation = useNavigation();
  const hasAnimated = useRef(false); // Track if animation has run

  useEffect(() => {
    if (hasAnimated.current) return; // Skip if already animated
    hasAnimated.current = true; // Mark as animated

    const animation = Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000, // 2 seconds for faster animation
      useNativeDriver: true,
    });

    animation.start(() => {
      setContinueButtonVisible(true);
    });

    return () => {
      animation.stop(); // Clean up animation on unmount
    };
  }, []); // Empty dependency array ensures effect runs once on mount

  return (
    <View className="flex-1 items-center py-[10%] bg-[#D9ECD9] px-3">
      {/* Header */}
      <View>
        <View
          className="rounded-full overflow-hidden"
          style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
          <Image
            source={require("../../assets/images/Logo.png")}
            className="w-full h-full object-cover"
          />
        </View>
        <View className="bg-white w-80 h-3 relative rounded-[30px] overflow-hidden mt-3">
          <View className="absolute bg-[#008000] w-80 h-3 rounded-[30px]" />
        </View>
      </View>

      {/* Page */}
      <View className="mt-10">
        <Text className="text-center text-xl font-bold capitalize">
          where do you get your
        </Text>
        <Text className="text-center text-xl font-bold capitalize">
          recipes from
        </Text>
        <Text className="text-center mt-5 capitalize">Select all to apply</Text>
      </View>

      <Animated.View
        style={{
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "36000deg"], // 3 full rotations
              }),
            },
          ],
        }}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ width: 300, height: 300 }}
        />
      </Animated.View>

      {/* Loading Text and Animation */}
      {!continueButtonVisible && (
        <View className="mt-5 flex-row items-center">
          <Text className="text-center text-lg capitalize mr-2">
            Preparing features just for you
          </Text>
          <ActivityIndicator size="small" color="#008000" />
        </View>
      )}

      {continueButtonVisible && (
        <Button
          title="Continue"
          onPress={() => navigation.navigate("Onboard")}
        />
      )}
    </View>
  );
};

export default Onboarding;
