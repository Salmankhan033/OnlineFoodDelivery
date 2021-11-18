import React, { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native'
import { useUser } from '../Context/UserContext'
import { Avatar } from 'react-native-paper'

const Screen = () => {
  const { user, ipaddress } = useUser()
  const [data, setdata] = useState()
  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/resturant/Doboyprofile?id=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        setdata(json[0])
      })
      .catch((error) => alert(error))
  }, [])
  console.log(data)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>

      {data != undefined ? (
        <Avatar.Text size={200} label={data.rcname[0]} style={styles.avatar} />
      ) : (
        <Text></Text>
      )}
      <View style={styles.body}>
        {data != undefined ? (
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{data.rcname}</Text>
            <Text style={styles.name}>{data.rcemail}</Text>
            <Text style={styles.info}>{data.rcnumber}</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'teal',
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
    backgroundColor: 'grey',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#393939',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: 'teal',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
export default Screen
