import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useContext } from 'react'
import { Card, Title, Paragraph, Button, Searchbar } from 'react-native-paper'

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useUser } from '../Context/UserContext'

export default function fooditem({ navigation, route }) {
  const [isLoading, setLoading] = useState(true)
  const [fooddata, setfoodData] = useState([])
  const { user, setUser, ipaddress } = useUser()
  useEffect(() => {
    fetch('http://' + ipaddress + '/fypapi/api/fooditem/allfood')
      .then((response) => response.json())
      .then((json) => {
        setfoodData(json)
      })
      .catch((error) => alert(error))
  }, [])

  const carddata = (item) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate('pickfood', { paramkey: item })}
        >
          <Card style={{ margin: 20, width: 250 }}>
            <Card.Cover
              source={{ uri: 'data:image/jpeg;base64,' + item.Imagepath }}
              style={{ width: 250, height: 100 }}
            />
            <Card.Content style={{}}>
              <Title>{item.name}</Title>
              <Paragraph>Price :{item.price}</Paragraph>
              <Paragraph>{item.rcname}</Paragraph>
              <Paragraph>rating:4.9</Paragraph>
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
        keyExtractor={({ fid }, index) => index.toString()}
        renderItem={({ item }) => <Text>{carddata(item)}</Text>}
      />
      <StatusBar backgroundColor="#1c313a" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
})
