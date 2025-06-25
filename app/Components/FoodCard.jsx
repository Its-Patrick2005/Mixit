import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FoodData from "../FoodData";

const meals = {
  breakfast: {
    name: "Breakfast",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2017/08/smoothie-bowl-3a8632c.jpg",
  },
  lunch: {
    name: "Lunch",
    image:
      "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y23_M_W27_UK_03_3_low-6510a59e.jpg",
  },
  dinner: {
    name: "Dinner",
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2.jpg",
  },
  supper: {
    name: "Supper",
    image:
      "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/italian-sunday-supper-0dda667a.jpg",
  },
};

// --------------------- FoodCard (Circular Image Card) ----------------------
const FoodCard = ({ name, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detailedfoodlist", {
          mealName: name.toLowerCase(),
        })
      }
      className="flex flex-col items-center mb-2 ml-2"
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          overflow: "hidden",
          shadowColor: "#003A00",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 12,
          marginBottom: 6,
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#003A00",
          textAlign: "center",
          lineHeight: 18,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

// --------------------- Horizontal Food Card Scroll ------------------------
const FoodCards = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {Object.values(meals).map((meal, idx) => (
      <View
        key={meal.name}
        style={{
          marginLeft: idx === 0 ? 2 : 0,
          marginRight: idx === Object.values(meals).length - 1 ? 2 : 12,
        }}
      >
        <FoodCard name={meal.name} image={meal.image} />
      </View>
    ))}
  </ScrollView>
);

// --------------------- Grid of Food Images ------------------------
export const FoodCard2 = React.memo(() => {
  const navigation = useNavigation();
  
  const handleFoodPress = useCallback((food) => {
    navigation.navigate("MealCard", { 
      food: {
        id: food.id,
        name: food.name,
        image: food.image,
        rating: food.rating,
        ingredients: food.ingredients,
        method: food.method,
        funFact: food.funFact
      }
    });
  }, [navigation]);

  const foodCards = useMemo(() => {
    return FoodData.map((food) => (
      <TouchableOpacity
        key={food.id}
        onPress={() => handleFoodPress(food)}
        style={{
          width: "48%",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#fff",
            shadowColor: "#003A00",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.35,
            shadowRadius: 15,
            elevation: 15,
            borderWidth: 1,
            borderColor: "#003A00",
          }}
        >
          <Image
            source={{ uri: food.image }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
          
          {/* Gradient overlay for better text readability */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              backgroundColor: "rgba(0, 58, 0, 0.4)",
            }}
          />
          
          {/* Rating badge */}
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#003A00" }}>
              ⭐ {food.rating}
            </Text>
          </View>
          
          {/* Food name overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#ffffff",
                textShadowColor: "rgba(0, 0, 0, 0.8)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                lineHeight: 18,
              }}
            >
              {food.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }, [handleFoodPress]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 30,
      }}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {foodCards}
      </View>
    </ScrollView>
  );
});

// --------------------- Detailed Food List Page ------------------------
export const Detailedfoodlist = React.memo(() => {
  const route = useRoute();
  const navigation = useNavigation();
  const mealName = route.params?.mealName || "";

  const filteredFoods = useMemo(() => {
    return FoodData.filter((food) =>
      food.id.toLowerCase().startsWith(mealName)
    );
  }, [mealName]);

  const handleFoodPress = useCallback((food) => {
    navigation.navigate("MealCard", { 
      food: {
        id: food.id,
        name: food.name,
        image: food.image,
        rating: food.rating,
        ingredients: food.ingredients,
        method: food.method,
        funFact: food.funFact
      }
    });
  }, [navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const foodCards = useMemo(() => {
    return filteredFoods.map((food) => (
      <View
        key={food.id}
        style={{
          width: "48%",
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => handleFoodPress(food)}>
          <View
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#003A00",
            overflow: "hidden",
            backgroundColor: "#fff",
            shadowColor: "#003A00",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 12,
            position: "relative",
          }}
        >
          <Image
            source={{ uri: food.image }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
          
          {/* Gradient overlay for better text readability */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              backgroundColor: "rgba(0, 58, 0, 0.4)",
            }}
          />
          
          {/* Food name overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#ffffff",
                textShadowColor: "rgba(0, 0, 0, 0.8)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              {food.name}
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginTop: 8,
            textAlign: "center",
            color: "#003A00",
          }}
        >
          ⭐ {food.rating}
        </Text>
      </View>
    ));
  }, [filteredFoods, handleFoodPress]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#D9ECD9" }}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: "10%",
        paddingBottom: 30,
      }}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
    >
      <View className="flex-row justify-between items-center mb-4">
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#003A00",
            textTransform: "capitalize",
          }}
        >
          {mealName}
        </Text>
        <TouchableOpacity
          onPress={handleGoBack}
          className="flex-row items-center"
        >
          <AntDesign name="left" size={24} color="#008000" />
          <Text style={{ fontSize: 18, color: "#008000" }}>Back</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {filteredFoods.length > 0 ? (
          foodCards
        ) : (
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 16, color: "#888" }}>
              No foods found for {mealName || "this meal"}.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
});

// --------------------- Grid Layout Addable Card ------------------------
export const FoodCard3 = ({ cardName, image = [], text, onPress, onLongPress }) => {
  return (
    <View className="bg-[#D9ECD9] flex-1 px-4 pt-10">
      <TouchableOpacity
        className="rounded-xl border border-[#003A00] p-1"
        style={{ width: 180, height: 150 }}
        activeOpacity={0.9}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {/* Image Grid */}
        <View className="flex-row flex-1">
          {/* Left Large Image */}
          <View className="w-[50%] mr-1 bg-gray-200 rounded-lg overflow-hidden">
            {image[0] ? (
              <Image
                source={{ uri: image[0] }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-full bg-gray-300" />
            )}
          </View>

          {/* Right Stacked Images */}
          <View className="w-[48%] justify-between">
            <View className="h-[48%] bg-gray-200 rounded-lg overflow-hidden mb-1">
              {image[1] ? (
                <Image
                  source={{ uri: image[1] }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-gray-300" />
              )}
            </View>
            <View className="h-[48%] bg-gray-200 rounded-lg overflow-hidden">
              {image[2] ? (
                <Image
                  source={{ uri: image[2] }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-gray-300" />
              )}
            </View>
          </View>
        </View>

        {/* Footer Text */}
        <View className="mt-2">
          <Text className="text-base font-semibold text-black">{cardName || "Cookbook"}</Text>
          <Text className="text-xs text-gray-700">{text || "0 Recipes"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Default Export
export default FoodCards;
