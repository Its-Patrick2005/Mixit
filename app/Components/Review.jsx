import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from '../theme.jsx';

const placeholderImage = require('../../assets/images/Logo.png');

const Review = ({text,image,name,ratings}) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  // Determine image source: local or remote
  let imageSource = imageError
    ? placeholderImage
    : (typeof image === 'string' ? { uri: image } : image);

  return (
    <View style={{
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: 20,
      width: 280,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme.border,
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <Image
          source={imageSource}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 12,
            borderWidth: 2,
            borderColor: theme.border,
          }}
          onError={() => setImageError(true)}
        />
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.primaryText,
            marginBottom: 4,
          }}>
            {name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: theme.primaryGreen,
            fontWeight: "600",
          }}>
            ⭐ {ratings}/5
          </Text>
        </View>
      </View>
      <Text style={{
        fontSize: 14,
        color: theme.secondaryText,
        lineHeight: 20,
        fontStyle: "italic",
      }}>
        "{text}"
      </Text>
    </View>
  );
};

export default Review;
