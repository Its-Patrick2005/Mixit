import { useState } from "react";
import { View } from "react-native";
import ImportTab from "../Components/ImportTab";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import { useTheme } from '../theme.jsx';
import Recipe from "./Recipe";

const RecipePage = ({ navigation }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.primaryBackground, flex: 1, position: 'relative' }}>
      <Navbar />

      <Search searchType="cookbooks" cookbooks={cookbooks} setCookbooks={setCookbooks} />

      <Recipe cookbooks={cookbooks} setCookbooks={setCookbooks} />

      <ImportTab currentPage="Recipe" />

    </View>
  );
};

export default RecipePage;
