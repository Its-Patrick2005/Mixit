import { useNavigation } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { useSidebar, useSidebarUser } from '../../sidebarContext';
import { useTheme } from '../theme.jsx';

const Navbar = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { openSidebar } = useSidebar();
  const { profileImage } = useSidebarUser();

  return (
    <View style={{ 
      marginTop: '15%', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: 16,
      backgroundColor: theme.primaryBackground,
    }}>
      {/* Touchable logo that navigates to Home */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{ 
          borderRadius: 50, 
          overflow: "hidden",
          width: "25%", 
          aspectRatio: 1, 
          alignSelf: "center" 
        }}
      >
        <Image
          source={require("../../assets/images/Asset 4.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right profile image */}
      <TouchableOpacity
        onPress={openSidebar}
        style={{ 
          borderRadius: 50, 
          overflow: "hidden",
          width: "18%", 
          aspectRatio: 1, 
          alignSelf: "center",
          borderWidth: 3,
          borderColor: theme.primaryGreen,
          shadowColor: theme.primaryGreen,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Image
          source={profileImage ? { uri: profileImage } : require("../../assets/images/Logo.png")}
          style={{ width: "100%", height: "100%", borderRadius: 50 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
