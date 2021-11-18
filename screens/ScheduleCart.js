import React, { useState } from 'react'
import { MaterialIcons, Ionicons } from 'react-native-vector-icons'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {
  RefreshControl,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native'

import { useSchedule } from '../Context/Schedulecontext'
import { useUser } from '../Context/UserContext'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
const Screen = () => {
  const { pickfood, setPickfood } = useSchedule()
  const { user, ipaddress } = useUser()
  const [result, setResult] = useState()
  var date =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() + 1) +
    '-' +
    new Date().getDate()
  var time = new Date().getHours() + ':' + new Date().getMinutes()
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(0).then(() => setRefreshing(false))
  }, [])

  const total = pickfood.reduce((t, i) => t + i.qty * i.price, 0)
  const quantityHandler = (action, index) => {
    const newItems = pickfood // clone the array

    let currentQty = newItems[index]['qty']

    if (action == 'more') {
      newItems[index]['qty'] = currentQty + 1
    } else if (action == 'less') {
      newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1
    }
    setPickfood(newItems)
    onRefresh()
  }
  function tabledata(item, index) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            marginBottom: 2,
            height: 120,
            width: wp('100%'),
          }}
        >
          <View style={[styles.centerElement, { width: 60 }]}>
            <TouchableOpacity
              style={[styles.centerElement, { width: 32, height: 32 }]}
              //onPress={() => this.selectHandler(i, item.checked)}
            >
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 1,
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity onPress={() => {}} style={{ paddingRight: 10 }}>
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + item.img }}
                style={[
                  styles.centerElement,
                  { height: 60, width: 60, backgroundColor: '#eeeeee' },
                ]}
              />
            </TouchableOpacity>
            <View
              style={{
                flexGrow: 1,
                flexShrink: 1,
                alignSelf: 'center',
              }}
            >
              <Text numberOfLines={1} style={{ fontSize: 15 }}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>
                empty
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: '#333333', marginBottom: 10 }}
              >
                {item.price * item.qty}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => quantityHandler('less', index)}
                  style={{ borderWidth: 1, borderColor: '#cccccc' }}
                >
                  <MaterialIcons name="remove" size={22} color="#cccccc" />
                </TouchableOpacity>
                <Text
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#cccccc',
                    paddingHorizontal: 7,
                    paddingTop: 3,
                    color: '#bbbbbb',
                    fontSize: 13,
                  }}
                >
                  {item.qty}
                </Text>
                <TouchableOpacity
                  onPress={() => quantityHandler('more', index)}
                  style={{ borderWidth: 1, borderColor: '#cccccc' }}
                >
                  <MaterialIcons name="add" size={22} color="#cccccc" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.centerElement, { width: 60 }]}>
            <TouchableOpacity
              style={[styles.centerElement, { width: 32, height: 32 }]}
              onPress={() => {
                pickfood.splice(index, 1)
                onRefresh()
              }}
            >
              <Ionicons name="md-trash" size={25} color="#ee4d2d" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  const order = () => {
    try {
      fetch('http://' + ipaddress + '/fypapi/api/order/addorders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          odate: date,
          deliverydate: date,
          otime: time,
          status: 'pending',
          Totalbill: total,
          cid: user.u_id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          orderdetail(json)
        })
        .catch((error) => alert(error)),
        alert('saved')
    } catch (e) {
      console.log(e)
    }
  }
  function orderdetail(json) {
    for (let i = 0; i < pickfood.length; i++) {
      try {
        fetch('http://' + ipaddress + '/fypapi/api/order/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oid: json,
            fid: pickfood[i].id,
            foodqantity: pickfood[i].qty,
          }),
        })
        alert('saved')
      } catch (e) {
        console.log(e)
      }
    }
    return
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={pickfood}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <Text>{tabledata(item, index)}</Text>}
      />
      <View
        style={{
          backgroundColor: '#fff',
          borderTopWidth: 2,
          borderColor: '#f6f6f6',
          paddingVertical: 5,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {/* <View style={[styles.centerElement, { width: 60 }]}>
            <View style={[styles.centerElement, { width: 32, height: 32 }]}>
              <MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
            </View>
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>Voucher</Text>
            <View style={{ paddingRight: 20 }}>
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: '#f0f0f0',
                  height: 25,
                  borderRadius: 4,
                }}
                placeholder="Enter voucher code"
                value={''}
                onChangeText={(searchKeyword) => {}}
              />
            </View> */}
          {/* </View> */}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.centerElement, { width: 60 }]}>
            <TouchableOpacity
              style={[styles.centerElement, { width: 32, height: 32 }]}
              //  onPress={() => this.selectHandlerAll(selectAll)}
            ></TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text></Text>
            <View
              style={{
                flexDirection: 'row',
                paddingRight: 20,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#8f8f8f' }}>SubTotal: </Text>
              <Text>{total}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 32,
            paddingRight: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[
              styles.centerElement,
              {
                backgroundColor: '#1c313a',
                width: 100,
                height: 25,
                borderRadius: 5,
              },
            ]}
            onPress={() => {
              if (cart.length === 0) {
                alert('there is no food in a cart')
              } else {
                order()
                setCart([])
              }
            }}
          >
            <Text style={{ color: '#ffffff' }}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity
          style={styles.btnbox}
          onPress={() => {
            if (cart.length === 0) {
              alert('there is no food in a cart')
            } else {
              order()
              setCart([])
            }
          }}
        >
          <Text style={styles.btntext}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnbox}>
          <Text style={styles.btntext}>Total Bill</Text>
        </TouchableOpacity> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  btnbox: {
    backgroundColor: '#1c313a',
    width: 300,
    margin: 10,
    marginLeft: 10,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerElement: { justifyContent: 'center', alignItems: 'center' },
})

export default Screen
