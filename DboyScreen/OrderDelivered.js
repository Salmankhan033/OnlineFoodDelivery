import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useUser } from '../Context/UserContext'
import { Card, Title, Paragraph, Searchbar, Divider } from 'react-native-paper'

export default function Delivered({ navigation, route }) {
  const item = route.params.paramkey
  const { ipaddress } = useUser()
  console.log(item)
  var date =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() + 1) +
    '-' +
    new Date().getDate()
  var time = new Date().getHours() + ':' + new Date().getMinutes()

  const statusupdate = (item) => {
    fetch(
      'http://' + ipaddress + '/fypapi/api/deliveryboy/updatedeliveredstatus',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oid: item.oid,
          status: 'Delivered',
          opickuptime: time,
          Delivereddate: date,
        }),
      }
    )
    navigation.navigate('PICKUPDETAIL', { paramkey: item })
  }
  return (
    <View style={styles.mainConatinerStyle}>
      <Card style={{ margin: 20 }}>
        <Card.Content>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('resturantmap', {
                paramkey: {
                  lat: parseFloat(item.clattitude),
                  long: parseFloat(item.clongitude),
                  title: 'Customer',
                },
              })
            }
          >
            <View style={{ flexDirection: 'row' }}>
              <Title ali>
                {'Customer Data'} {'\t\t\t\t'}
              </Title>
              <Image
                style={styles.logo}
                source={require('../components/images/person.png')}
              />
            </View>
            <Paragraph>
              {'Name    : '}
              {item.cname}
            </Paragraph>
            <Paragraph>
              {'Address  : '}
              {item.cAddrees}
            </Paragraph>
            <Paragraph></Paragraph>
          </TouchableOpacity>
          <Divider style={{ borderWidth: 1 }} />
          <Title>{'Collect Cash'}</Title>
          <Paragraph>
            {' Collect Cash from customer\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'}
          </Paragraph>

          <Divider style={{ borderWidth: 1 }} />
          <Paragraph></Paragraph>
          <Paragraph></Paragraph>
          <TouchableOpacity style={{ marginTop: 30 }}>
            <Button
              title="Delivered"
              onPress={() => {
                alert('order successfully Delievered')
                navigation.navigate('order')
              }}
            />
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1,
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  logo: {
    width: 66,
    height: 58,
  },
})
