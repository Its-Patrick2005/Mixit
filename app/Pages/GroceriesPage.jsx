import { View, Text } from 'react-native'
import React from 'react'
import ImportTab from '../Components/ImportTab'
import Navbar from '../Components/Navbar'

const GroceriesPage = ({navigation}) => {
  return (
    <View>
      <Navbar />
      <Text>GroceriesPage</Text>
      <View>
        <ImportTab />
      </View>
    </View>
  )
}

export default GroceriesPage