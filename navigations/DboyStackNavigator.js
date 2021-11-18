import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Status from '../DboyScreen/Status'
import Status1 from '../DboyScreen/Status1'
import Deliveries from '../DboyScreen/Deliveries'
import Order from '../DboyScreen/orders'
import Pickuporder from '../DboyScreen/OrderPickup'
import ResturantMap from '../DboyScreen/ResturantMap'
import OrderDelivered from '../DboyScreen/OrderDelivered'
import AcccpetedOrder from '../DboyScreen/AcceptedOrders'

const Stack = createStackNavigator()

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="status"
        component={Status}
        options={{
          headerTitle: 'Status',
        }}
      />
      <Stack.Screen
        name="status1"
        component={Status1}
        options={{
          headerTitle: 'Status',
        }}
      />
      <Stack.Screen name="Deliveries" component={Deliveries} />
      <Stack.Screen
        name="order"
        component={Order}
        options={{ headerTitle: 'New Order' }}
      />
      <Stack.Screen name="ACCEPTEDORDER" component={AcccpetedOrder} />
      <Stack.Screen name="PICKUPDETAIL" component={Pickuporder} />
      <Stack.Screen
        name="resturantmap"
        component={ResturantMap}
        options={{ headerTitle: 'Map' }}
      />
      <Stack.Screen name="DROPOFFDETAIL" component={OrderDelivered} />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigator
