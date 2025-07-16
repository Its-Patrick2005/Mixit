import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { navigate } from '../../navigationRef';
import { useSidebarUser } from '../../sidebarContext';
import { useTheme } from '../theme.jsx';

const Sidebar = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { profileImage, setProfileImage } = useSidebarUser();
  const [showImagePicker, setShowImagePicker] = React.useState(false);

  const menuItems = [
    { name: "Upgrade to MixIt Plus", icon: <MaterialIcons name="workspace-premium" size={32} color={theme.primaryGreen} />, route: "Upgrade" },
    { name: "Add the MixIt Shortcut", icon: <Ionicons name="add-circle-outline" size={32} color={theme.primaryGreen} />, route: "Shortcut" },
    { name: "Read our import guides", icon: <Ionicons name="book-outline" size={32} color={theme.primaryGreen} />, route: "ImportGuides" },
    { name: "Use MixIt on Desktop", icon: <Ionicons name="desktop-outline" size={32} color={theme.primaryGreen} />, route: "Desktop" },
    { name: "Invite Friends", icon: <Ionicons name="person-add-outline" size={32} color={theme.primaryGreen} />, route: "Invite" },
    { name: "Help", icon: <Ionicons name="help-circle-outline" size={32} color={theme.primaryGreen} />, route: "Help" },
    { name: "Settings", icon: <Ionicons name="settings-outline" size={32} color={theme.primaryGreen} />, route: "Settings" },
  ];

  const handleNavigation = (route) => {
    onClose();
    setTimeout(() => navigate(route), 200);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
      setShowImagePicker(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      flexDirection: 'row',
    }}>
      {/* Overlay with blur and close on press */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{ flex: 1, height: '100%' }}
      >
        <BlurView intensity={40} tint="dark" style={{ flex: 1, height: '100%' }} />
      </TouchableOpacity>
      {/* Sidebar on the right */}
      <View style={{
        width: '55%',
        height: '100%',
        backgroundColor: theme.modalBackground,
        shadowColor: theme.shadow,
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        paddingTop: 40,
        paddingHorizontal: 12,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
      }}>
        {/* Profile Section */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', marginBottom: 8, borderWidth: 2, borderColor: theme.primaryGreen }}>
            <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/Logo.png')} style={{ width: '100%', height: '100%' }} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: theme.primaryText }}>martinafful2304992</Text>
          <Text style={{ color: theme.secondaryText, fontSize: 14 }}>Martin Afful</Text>
          <TouchableOpacity style={{ marginTop: 4 }} onPress={() => setShowImagePicker(true)}>
            <Text style={{ color: theme.primaryGreen, fontSize: 13, textDecorationLine: 'underline' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {/* Image Picker Modal */}
        {showImagePicker && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}>
            <View style={{ backgroundColor: theme.modalBackground, borderRadius: 16, padding: 24, alignItems: 'center', width: 280 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.primaryText, marginBottom: 16 }}>Change Profile Picture</Text>
              <TouchableOpacity
                style={{ backgroundColor: theme.primaryGreen, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginBottom: 12 }}
                onPress={pickImage}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 8 }}
                onPress={() => setShowImagePicker(false)}
              >
                <Text style={{ color: theme.secondaryText, fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Menu Items */}
        <View style={{ gap: 12 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigation(item.route)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.cardBackground,
                borderRadius: 14,
                paddingVertical: 16,
                paddingHorizontal: 16,
                marginBottom: 0,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
                borderWidth: 1,
                borderColor: theme.border,
                width: '100%',
              }}
            >
              <View style={{ marginRight: 16 }}>{item.icon}</View>
              <Text style={{ fontSize: 16, color: theme.primaryText, fontWeight: '500', flex: 1 }}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={22} color={theme.tertiaryText} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 16, right: 16 }}>
          <Ionicons name="close" size={28} color={theme.primaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;
