import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useContext } from 'react'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useUser } from '../Context/UserContext'
import { useCart } from '../Context/CartContext'
export default function fooditem({ navigation, route }) {
  const [isLoading, setLoading] = useState(true)
  const [fooddata, setfoodData] = useState([])
  const id = route.params.paramkey
  const { cart, setcart } = useCart()
  const { user, setUser, ipaddress } = useUser()
  useEffect(() => {
    fetch('http://' + ipaddress + '/fypapi/api/fooditem/getfood?id=' + id + '')
      .then((response) => response.json())
      .then((json) => {
        setfoodData(json)
      })
      .catch((error) => alert(error))
    return () => setfoodData(null)
  }, [])

  const cartcheck = (item) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === item.fname) {
        alert('Product already exist in cart')
        return
      }
    }
    navigation.navigate('BillCal', { paramkey: item })
  }

  const carddata = (item) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => cartcheck(item)}
          style={{
            borderRadius: 5,
            borderColor: 'black',
            borderWidth: 1,
          }}
        >
          <Card key={item.fid.toString()} style={{ margin: 20 }}>
            <Card.Cover
              source={{ uri: 'data:image/jpeg;base64,' + item.fImagepath }}
              style={{ width: wp('75%'), height: 100 }}
            />
            <Card.Content>
              <Title>{item.fname}</Title>
              <Paragraph>Price :{item.fprice}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,

          textAlign: 'center',
        }}
      ></Text>
      <View style={{}}></View>
      <FlatList
        data={fooddata}
        //  keyExtractor={(item) => item.fid.toString()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{carddata(item)}</Text>}
      />
      <StatusBar backgroundColor="#1c313a" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: wp('6%'),
    width: wp('100%'),
    backgroundColor: '#fff',
  },
})
