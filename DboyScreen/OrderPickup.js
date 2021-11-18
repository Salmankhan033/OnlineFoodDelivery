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

export default function pickup({ navigation, route }) {
  const item = route.params.paramkey
  var time = new Date().getHours() + ':' + new Date().getMinutes()
  const { ipaddress } = useUser()
  console.log(item)
  const statusupdate = (item) => {
    fetch(
      'http://' + ipaddress + '/fypapi/api/deliveryboy/updatepickupstatus',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oid: item.oid,
          status: 'pickup',
          opickuptime: time,
        }),
      }
    )
    navigation.navigate('DROPOFFDETAIL', { paramkey: item })
  }
  return (
    <View style={styles.mainConatinerStyle}>
      <Card style={{ margin: 20 }}>
        <Card.Content>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('resturantmap', {
                paramkey: {
                  lat: parseFloat(item.rclattitude),
                  long: parseFloat(item.rclongitude),
                  title: 'Resturant',
                },
              })
            }
          >
            <View style={{ flexDirection: 'row' }}>
              <Title ali>
                {'Resturant Address'} {'\t\t\t\t'}
              </Title>
              <Image
                style={styles.logo}
                source={require('../components/images/resturant.png')}
              />
            </View>
            <Paragraph>{item.rcname}</Paragraph>
            <Paragraph>{item.rcaddress}</Paragraph>
            <Paragraph></Paragraph>
          </TouchableOpacity>
          <Divider style={{ borderWidth: 1 }} />
          <Title>{'Customer Name :'}</Title>
          <Paragraph>
            {item.cname}
            {'\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'}
            {item.Totalbill} PKR
          </Paragraph>

          <Divider style={{ borderWidth: 1 }} />
          <Paragraph></Paragraph>
          <Paragraph></Paragraph>
          <TouchableOpacity style={{ marginTop: 30 }}>
            <Button title="pickup" onPress={() => statusupdate(item)} />
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
