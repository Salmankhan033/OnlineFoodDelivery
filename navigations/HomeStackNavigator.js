import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Platform, Switch } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import FoodItemScreen from '../screens/FoodItemScreen'
import BillScreen from '../screens/CalculateBill'
import { Image } from 'react-native'
import CartScreen from '../screens/Cart'
const Stack = createStackNavigator()
import Orderdetail from '../screens/Orderdetail'
import ShoppingCartIcon from '../Container/ShoppingCartIcon'
import Icon from 'react-native-vector-icons/Ionicons'
import { DrawerContent } from '../components/DrawerContent'
import Schadule from '../screens/Schedule'
import ScheduleFood from '../screens/ScheduleFood'
import showschadule from '../screens/ShowSchadule'
import PickFood from '../screens/PickFood'
import Orderfood from '../screens/OrderFoods'
import Order from '../screens/OrdersTab'
import RatingFood from '../screens/RatingFood'
import MapScreen from '../screens/MapScreen'
import ScheduleCart from '../screens/ScheduleCart'
const HomeStackNavigator = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  function Cart() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../components/images/cart.jpg')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
        <ShoppingCartIcon />
      </View>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home Activity',
          headerLeft: (sss) => (
            <Icon
              name={Platform.OS === 'ios' ? 'ios-menu-outline' : 'md-menu'}
              onPress={() => navigation.openDrawer()}
              size={30}
              style={{ marginLeft: 10 }}
            />
          ),
          headerRight: (props) => <Cart />,
        }}
      />
      <Stack.Screen
        name="fooditem"
        component={FoodItemScreen}
        options={{
          headerTitle: 'Food Items',
          headerRight: (props) => <Cart />,
        }}
      />
      <Stack.Screen
        name="BillCal"
        component={BillScreen}
        options={{
          headerTitle: 'Add to Cart',
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="orderfood" component={Orderfood} />
      <Stack.Screen name="orders" component={Order} />

      <Stack.Screen
        name="schadule"
        component={Schadule}
        options={{
          headerTitle: 'Add Schadule',
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ScheduleCart')}
            >
              <Text
                style={{ marginRight: 20, fontWeight: 'bold', fontSize: 18 }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="cart" component={CartScreen} />
      <Stack.Screen
        name="Resturant"
        component={ScheduleFood}
        options={{
          headerTitle: 'Food Items',
        }}
      />
      <Stack.Screen
        name="showschadule"
        component={showschadule}
        options={{
          headerTitle: 'Week Schedule',
          headerRight: () => (
            <TouchableOpacity>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="pickfood" component={PickFood} />
      <Stack.Screen name="rating" component={RatingFood} />
      <Stack.Screen name="map" component={MapScreen} />
      <Stack.Screen name="ScheduleCart" component={ScheduleCart} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
