import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { useUser } from '../Context/UserContext'
import { useIsFocused } from '@react-navigation/native'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  SwipeRow,
  Button,
} from 'native-base'
import { DataTable } from 'react-native-paper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
export default function orderfood({ route }) {
  let oid = route.params.paramkey
  const [data, setdata] = useState()
  const { ipaddress } = useUser()
  useEffect(() => {
    fetch('http://' + ipaddress + '/fypapi/api/order/orderfood?oid=' + oid + '')
      .then((response) => response.json())
      .then((json) => {
        setdata(json)
      })
      .catch((error) => alert(error))
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{ uri: 'data:image/jpeg;base64,' + item.FImage }}
                  />
                </Left>

                <Body>
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.fName}
                    {'\t\t\t\t'}
                    {item.foodQantity}
                  </Text>
                  <Text></Text>
                </Body>

                <Right>
                  <Button transparent>
                    <Text>Repeat</Text>
                  </Button>
                </Right>
              </ListItem>
            </List>
          )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
    width: wp('100%'),
    height: hp('100%'),
  },
})
