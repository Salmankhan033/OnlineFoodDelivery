import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useUser } from '../Context/UserContext'
export default function status({ navigation }) {
  const [data, setData] = useState()
  const { ipaddress, user } = useUser()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/deliveryboy/Dboyprofile?id=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json[0])
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false))
  }, [])
  // setTimeout(() => {
  //   setLoading(false)
  // }, 7000)
  if (isLoading) {
    return <ActivityIndicator size="large" color={'blue'} />
  }
  const statusupdate = (action, id) => {
    if (action == 'ready') {
      fetch('http://' + ipaddress + '/fypapi/api/deliveryboy/statsupdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          did: id,
          WorkingStatus: true,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          alert('Ready')
        })
    } else if (action == 'notready') {
      fetch('http://' + ipaddress + '/fypapi/api/deliveryboy/statsupdate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          did: id,
          WorkingStatus: false,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          alert('Not Ready')
        })
    }
  }
  const postupdates = {}
  return (
    <View style={styles.mainConatinerStyle}>
      <View
        style={{
          height: hp('10%'),
          width: wp('100%'),
          borderWidth: 1,
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Text style={styles.text}> Current status</Text>
        {data.WorkingStatus !== true ? (
          <Text>Starting soon</Text>
        ) : (
          <Text>Ready</Text>
        )}
      </View>
      <View
        style={{
          height: hp('50%'),
          width: wp('100%'),
          borderWidth: 1,
          padding: 20,
        }}
      >
        <Text>Press start to start shift</Text>
        <Text>Time</Text>
        <Text style={styles.text1}>16:00-20:00</Text>
        <Text>Zone</Text>
        <Text style={styles.text1}>Khana pul</Text>
        <Button
          title="Start"
          onPress={() => statusupdate('ready', data.did)}
        ></Button>
        <Button
          title="End"
          onPress={() => statusupdate('notready', data.did)}
        ></Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
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
})
