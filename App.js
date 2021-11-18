import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { UserProvider, useUser } from './Context/UserContext'
import { CartProvider } from './Context/CartContext'
import LoginStackNavigator from './navigations/LoginStackNavigator'
import MyDrawerNavigator from './navigations/MyDrawerNavigator'
import ResturantDrawerNavigator from './navigations/ResutrantDrawerNavigator'
import { ScheduleProvider } from './Context/Schedulecontext'
import DboyDrawerNavigator from './navigations/DboyDrawerNavigator'

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ScheduleProvider>
          <NavigationContainer>
            <ChooseNavigation />
          </NavigationContainer>
        </ScheduleProvider>
      </CartProvider>
    </UserProvider>
  )
}

function ChooseNavigation() {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((data) => {
        if (data) {
          setUser(JSON.parse(data))
          setIsLoggedIn(true)
          return
        }
        setIsLoggedIn(false)
      })
      .then(() => {
        setLoading(false)
      })
  }, [setUser, setIsLoggedIn])

  if (loading) return <ActivityIndicator />

  if (!isLoggedIn || !user) {
    return <LoginStackNavigator />
  }

  if (user.roles.toLowerCase() === 'customer') {
    return <MyDrawerNavigator />
  }

  if (user.roles.toLowerCase() === 'resturant') {
    return <ResturantDrawerNavigator />
  }
  if (user.roles.toLowerCase() === 'deliveryboy') {
    return <DboyDrawerNavigator />
  }

  return (
    <View>
      <Text>You are not logged in as customer</Text>
    </View>
  )
}
