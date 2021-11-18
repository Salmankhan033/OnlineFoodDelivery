import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import FoodItemScreen from '../screens/FoodItemScreen'
import { Image, TouchableOpacity, View } from 'react-native'
import AddFoodScreen from '../ResturantScreen/AddFoodScreen'
import ResturantFoodScreen from '../ResturantScreen/ResturantFoodScreen'
import ResturantFoodUpdate from '../ResturantScreen/ResutrantFoodUpdate'
import scheduleorder from '../ResturantScreen/ScheduleOrder'
import CurrentOrders from '../ResturantScreen/Currentorder'
import ProfileScreen from '../ResturantScreen/ProfileScreen'
import UpdateProfile from '../ResturantScreen/UpdateProfile'
import Icon from 'react-native-vector-icons/Ionicons'
import { Badge } from 'react-native-paper'

const Stack = createStackNavigator()

const ResturantStackNavigator = ({ navigation }) => {
  function Edit() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('updateprofile')}>
          <Image
            source={require('../components/images/Edit.png')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ResturantFoodScreen}
        options={{
          headerLeft: (props) => (
            <Icon
              name={Platform.OS === 'ios' ? 'ios-menu-outline' : 'md-menu'}
              onPress={() => navigation.openDrawer()}
              size={30}
              style={{ marginLeft: 10 }}
            />
          ),
          headerTitle: ' Home',
          headerRight: (props) => (
            <View>
              <TouchableOpacity style={{ paddingRight: 10, paddingBottom: 20 }}>
                <Badge></Badge>

                <Image
                  source={require('../components/images/dishicon.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="AddFoodItem" component={AddFoodScreen} />
      <Stack.Screen name="update" component={ResturantFoodUpdate} />
      <Stack.Screen name="CurrentOrder" component={CurrentOrders} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'User Profile',
          headerRight: (props) => <Edit />,
        }}
      />
      <Stack.Screen name="updateprofile" component={UpdateProfile} />
    </Stack.Navigator>
  )
}

export default ResturantStackNavigator
