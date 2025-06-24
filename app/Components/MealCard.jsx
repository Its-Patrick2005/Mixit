import React from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


const MealCard = ({ route, navigation }) => {
  const { food } = route.params;
  const screenHeight = Dimensions.get("window").height;

  const Card = ({ children }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {children}
    </View>
  );

  return (
    <ScrollView
      className="bg-[#D9ECD9] flex-1 py-[10%] px-3"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Back Button */}
       <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-4 ">
          <AntDesign name="left" size={24} color="#008000" />
          <Text style={{ fontSize: 18, color: "#008000" }}>Back</Text>
        </TouchableOpacity>

      {/* Food Image */}
      <View
        style={{
          height: screenHeight * 0.3,
          position: "relative",
          overflow: "hidden",
          borderRadius: 10,
          marginHorizontal: 10,
          borderWidth: 2,
          borderColor: "#003A00",
        }}
      >
        <Image
          source={{ uri: food.image }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            fontSize: 24,
            fontWeight: "bold",
            color: "#D9ECD9",
            textShadowColor: "rgba(0, 0, 0, 0.7)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          {food.name}
        </Text>
      </View>

      {/* Rating */}
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Rating: ⭐ {food.rating}
        </Text>
      </View>

      {/* Ingredients Section */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#003A00", marginBottom: 8 }}>
          Ingredients
        </Text>
        <Card>
          {Array.isArray(food.ingredients) ? (
            food.ingredients.map((item, index) => (
              <Text key={index} style={{ fontSize: 14, marginBottom: 4 }}>
                • {item}
              </Text>
            ))
          ) : (
            <Text>{food.ingredients}</Text>
          )}
        </Card>
      </View>

      {/* Method Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#003A00", marginBottom: 8 }}>
          Method
        </Text>
        <Card>
          {Array.isArray(food.method) ? (
            food.method.map((step, index) => (
              <Text key={index} style={{ fontSize: 14, marginBottom: 6 }}>
                {index + 1}. {step}
              </Text>
            ))
          ) : (
            <Text>{food.method}</Text>
          )}
        </Card>
      </View>

      {/* Fun Fact Section */}
      {food.funFact && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#003A00", marginBottom: 8 }}>
            Fun Fact
          </Text>
          <Card>
            <Text style={{ fontSize: 14 }}>{food.funFact}</Text>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};

export default MealCard;
