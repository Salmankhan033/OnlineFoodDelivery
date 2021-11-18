import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Status from '../DboyScreen/Status'
import Order from '../DboyScreen/orders'
const Tabs = createBottomTabNavigator()
const TabNavigator = () => {
  const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    style: { backgroundColor: 'white' },
  }
  return (
    <Tabs.Navigator
      tabBarOptions={{
        style: {
          height: 60,
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 16,
        },
        indicatorStyle: {
          //borderBottomWidth:1,
        },
      }}
    >
      <Tabs.Screen name="status" component={Status} />
      <Tabs.Screen name="Order" component={Order} />
    </Tabs.Navigator>
  )
}

export default TabNavigator
