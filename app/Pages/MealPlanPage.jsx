import { View, Text } from 'react-native'
import React from 'react'
import ImportTab from '../Components/ImportTab'
import Navbar from '../Components/Navbar'

const MealPlanPage = ({navigation}) => {
  return (
    <View>
      <Navbar />
      <Text>MealPlanPage</Text>
      <View>
        <ImportTab />
      </View>
    </View>
  )
}

export default MealPlanPage