import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native'

import { Card, Paragraph, Title, Button } from 'react-native-paper'
import { useUser } from '../Context/UserContext'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import DropDownPicker from 'react-native-dropdown-picker'
export default function showOrder({ navigation }) {
  const { user, ipaddress } = useUser()
  const [data, setdata] = useState()

  useEffect(() => {
    fetch('http://' + ipaddress + '/fypapi/api/schedule/showschedule')
      .then((response) => response.json())
      .then((json) => {
        setdata(json)
      })
      .catch((error) => alert(error))
  }, [])
  const carddata = (item) => {
    return (
      <View
        style={{
          alignItems: 'center',
          width: 350,
          marginTop: 10,
          marginLeft: 20,
          justifyContent: 'center',
        }}
      >
        <Card style={{ margin: 20, width: 300, alignItems: 'center' }}>
          <Card.Content style={{}}>
            <Title>Food :{item.fName}</Title>
            <View style={{ flexDirection: 'row' }}>
              <Paragraph style={{ marginRight: 20 }}>
                meal :{item.Routinetype}
              </Paragraph>
              <Paragraph>Day:{item.Deleiveryday}</Paragraph>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 20 }}>
              <Paragraph style={{ marginRight: 20 }}>
                time :{item.dtime}
              </Paragraph>
              <Paragraph>price: {item.fprice}</Paragraph>
            </View>

            <Card.Actions
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                alignItems: 'center',
              }}
            >
              <Button>Accept</Button>
            </Card.Actions>
          </Card.Content>
        </Card>
      </View>
    )
  }
  const [daydata, setdaydata] = useState()

  // function deleteschedule(mid) {
  //   fetch(
  //     'http://' +
  //       ipaddress +
  //       '/fypapi/api/schedule/Deleteschedule?mid=' +
  //       mid +
  //       ''
  //   ).catch((error) => alert(error))
  // }
  return (
    <View style={styles.mainConatinerStyle}>
      <View>
        <FlatList
          data={data}
          //  keyExtractor={(item) => item.fid.toString()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{carddata(item)}</Text>}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1,
    height: hp('70%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 25,
    backgroundColor: 'grey',
    width: 80,
    borderRadius: 100,
    alignItems: 'center',
  },
})
