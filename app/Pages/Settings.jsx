import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from 'react-native';
import { useSidebar } from '../_layout.jsx';
import { useTheme } from '../theme.jsx';

const Settings = () => {
  const navigation = useNavigation();
  const { openSidebar } = useSidebar();
  const { theme } = useTheme();

  const settingsOptions = [
    { title: 'Account Settings', icon: 'settings-outline' },
    { title: 'My Subscription', icon: 'settings-outline' },
    { title: 'Help', icon: 'settings-outline' },
  ];

  const handleBack = () => {
    navigation.goBack();
    setTimeout(() => openSidebar(), 10); // Reopen sidebar after navigating back
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground, paddingTop: 40 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={handleBack} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={22} color={theme.primaryText} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={{ marginBottom: 32 }}>
        {settingsOptions.map((option, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 18,
                paddingHorizontal: 16,
              }}
            >
              <Ionicons name={option.icon} size={22} color={theme.primaryText} style={{ marginRight: 16 }} />
              <Text style={{ fontSize: 16, color: theme.primaryText }}>{option.title}</Text>
            </TouchableOpacity>
            {index < settingsOptions.length - 1 && (
              <View style={{ height: 1, backgroundColor: theme.borderLight, marginHorizontal: 16 }} />
            )}
          </View>
        ))}
      </View>

      {/* Log out button */}
      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.primaryGreen,
            paddingHorizontal: 32,
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
