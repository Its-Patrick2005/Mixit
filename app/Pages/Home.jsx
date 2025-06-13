import { View, Text } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text onPress={() => navigation.navigate("Groceries")} >Home</Text>
    </View>
  )
}

export default Home