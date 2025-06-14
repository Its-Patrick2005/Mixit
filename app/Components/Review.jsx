import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const Review = ({text,image,name,ratings}) => {
return (
    <View className="bg-[#B0D8B0] w-[250px] h-[210px] rounded-br-[80px] relative mt-10 overflow-visible p-2">
        <View className="absolute -top-10  items-center justify-center">
            <Text className="text-[100px] font-bold text-[#003A00]">“</Text>
        </View>
        
        <View className="flex-row items-center mb-2 mt-10">
            {[...Array(5)].map((_, i) => (
                <FontAwesome
                    key={i}
                    name={i < ratings ? "star" : "star-o"} // 4 filled, 1 outlined for example
                    size={18}
                    color="#facc15" // Tailwind yellow-400
                    className="mr-1"
                />
            ))}
            <Text className="ml-2 text-gray-500 text-xs">(5.0)</Text>
        </View>
        <View>
            <Text>
                 {text}
            </Text>
            <View className="flex-row items-center mt-4">
                <View className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-2">
                    {/* Replace with Image component for real avatar */}
                    <Image  source={require("../../assets/images/Logo.png")} className="w-full h-full"/>
                </View>
                <Text className="font-semibold text-gray-700">{name}</Text>
            </View>
        </View>
    </View>
);
};

export default Review;
