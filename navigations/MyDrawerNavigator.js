import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
//import TabNavigator from './TabNavigator'
import { useUser } from '../Context/UserContext'
import HomeStackNavigator from './HomeStackNavigator'
import { DrawerContent } from '../components/DrawerContent'
import AsyncStorage from '@react-native-community/async-storage'
import ProfileScreen from '../screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import Orderdetail from '../screens/Orderdetail'
const Drawer = createDrawerNavigator()

export default function MyDrawerNavigator({ navigation }) {
  const { setUser, setIsLoggedIn } = useUser()

  const logoutAction = async ({ navigation }) => {
    await AsyncStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    // drawerContent={(props) => <DrawerContent {...props} />}
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={logoutAction} />
            <DrawerItem
              label="Rating"
              onPress={() => props.navigation.navigate('rating')}
            />

            <DrawerItem
              label="Orders"
              onPress={() => props.navigation.navigate('orders')}
            />
            <DrawerItem
              label="Schedule"
              onPress={() => props.navigation.navigate('showschadule')}
            />
            <DrawerItem
              label="Maps"
              onPress={() => props.navigation.navigate('map')}
            />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      {/* <Drawer.Screen name="Login" component={LoginStackNavigator} />
      <Drawer.Screen name="Resturant" component={ResturatStackNavigator} /> */}
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="OrderDetail" component={Orderdetail} />
    </Drawer.Navigator>
  )
}
