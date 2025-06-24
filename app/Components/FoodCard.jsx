import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
 
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FoodData from "../FoodData";
import AntDesign from "@expo/vector-icons/AntDesign";

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
      className="flex flex-col items-center mb-2"
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#003A00",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#003A00",
          marginTop: 6,
          textAlign: "center",
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
export const FoodCard2 = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: 10,
        paddingBottom: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {FoodData.map((food) => (
          <TouchableOpacity
            key={food.id}
            onPress={() => navigation.navigate("MealCard", { food })}
            style={{
              width: "48%",
              marginBottom: 12,
              paddingHorizontal: 4,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#003A00",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <Image
                source={{ uri: food.image }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#003A00",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {food.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#888",
                textAlign: "center",
              }}
            >
              ⭐ {food.rating}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// --------------------- Detailed Food List Page ------------------------
export const Detailedfoodlist = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const mealName = route.params?.mealName || "";

  const filteredFoods = FoodData.filter((food) =>
    food.id.toLowerCase().startsWith(mealName)
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#D9ECD9" }}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: "10%",
        paddingBottom: 30,
      }}
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
          onPress={() => navigation.goBack()}
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
          filteredFoods.map((food) => (
            <View
              key={food.id}
              style={{
                width: "48%",
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("MealCard", { food })}>
                <View
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: food.image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                {food.name}
              </Text>
              <Text
                style={{ fontSize: 15, color: "#888", textAlign: "center" }}
              >
                ⭐ {food.rating}
              </Text>
            </View>
          ))
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
};

// --------------------- Grid Layout Addable Card ------------------------




export const FoodCard3 = ({ cardName, image = [], text, onPress }) => {
  return (
    <View className="bg-[#D9ECD9] flex-1 px-4 pt-10">
      <TouchableOpacity
        className="rounded-xl border border-[#003A00] p-1"
        style={{ width: 180, height: 150 }}
        activeOpacity={0.9}
        onPress={onPress}
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
