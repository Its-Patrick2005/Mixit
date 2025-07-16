import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from "react";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});
export function useSidebar() {
  return useContext(SidebarContext);
}

export const SidebarUserContext = createContext({
  profileImage: null,
  setProfileImage: () => {},
});

export function SidebarUserProvider({ children }) {
  const [profileImage, setProfileImageState] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const uri = await AsyncStorage.getItem('profileImage');
        if (uri) setProfileImageState(uri);
      } catch (e) {}
    })();
  }, []);

  const setProfileImage = async (uri) => {
    setProfileImageState(uri);
    try {
      if (uri) {
        await AsyncStorage.setItem('profileImage', uri);
      } else {
        await AsyncStorage.removeItem('profileImage');
      }
    } catch (e) {}
  };

  return (
    <SidebarUserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </SidebarUserContext.Provider>
  );
}

export function useSidebarUser() {
  return useContext(SidebarUserContext);
}

// Dummy component for router default export
const SidebarContextComponent = () => null;
export default SidebarContextComponent; 