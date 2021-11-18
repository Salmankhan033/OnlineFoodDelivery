import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { useCart } from '../Context/CartContext'
import { Card, Title, Paragraph } from 'react-native-paper'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import InputSpinner from 'react-native-input-spinner'
import { useSchedule } from '../Context/Schedulecontext'
export default function calculate({ navigation, route }) {
  const { pickfood } = useSchedule()
  const [qval, setqval] = useState(1)
  const { cart, setCart } = useCart()
  const food = route.params.paramkey
  const k = cart.length
  console.log(food.fid)
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          textAlign: 'center',
        }}
      ></Text>

      <View style={{}}>
        <Card>
          <Card.Cover
            source={{ uri: 'data:image/jpeg;base64,' + food.Imagepath }}
            style={{ width: 310, height: 150 }}
          />

          <Card.Content>
            <Title>{food.name}</Title>
            <Paragraph>Price:{food.price}</Paragraph>
            {/* <Paragraph>discount :{food.type}</Paragraph> */}
          </Card.Content>
        </Card>
      </View>
      <View style={{ height: 100 }}>
        <InputSpinner
          max={10}
          min={1}
          step={1}
          onChange={setqval}
          style={{ borderColor: 'black', marginTop: 50, marginLeft: 100 }}
        />
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={styles.btnbox}
          onPress={() => {
            pickfood.push({
              fid: food.fid,
              name: food.name,
              qty: qval,
              img: food.Imagepath,
              price: food.price,
            })
            alert('one product added')
            navigation.navigate('schadule')
          }}
        >
          <Text style={styles.btntext}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnbox}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.btntext}></Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    alignItems: 'center',
  },
})
