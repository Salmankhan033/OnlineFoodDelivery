import React from 'react'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import UsersSignup from '../screens/UsersSignup'
import cussignup from '../screens/CustomerSignup'
import Login from '../screens/Login'
import DboySignup from '../DboyScreen/DboySignup'
import ResturantSignup from '../screens/ResturantSignup'
const Stack = createStackNavigator()

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} headerMode="none" />
      <Stack.Screen name="Usersignup" component={UsersSignup} />
      <Stack.Screen
        name="ResturantSignup"
        component={ResturantSignup}
        options={{
          headerTitle: 'Resturant/Cook Signup',
        }}
      />

      <Stack.Screen
        name="Signup"
        component={cussignup}
        options={{
          headerTitle: 'Customer Signup',
        }}
      />
      <Stack.Screen
        name="dsignup"
        component={DboySignup}
        options={{
          headerTitle: 'Delievery Boy Signup',
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginNavigator
