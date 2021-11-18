import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native'
import { MaterialIcons, Ionicons } from 'react-native-vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { Card, Paragraph, Title, Button } from 'react-native-paper'
import { useUser } from '../Context/UserContext'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import DropDownPicker from 'react-native-dropdown-picker'
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
  Divider,
} from 'native-base'
import { LogBox } from 'react-native'
import { StatusBarIOS } from 'react-native'
LogBox.ignoreLogs(['Warning: ...'])
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const capitalize = (str) => str.substring(0, 1).toUpperCase() + str.substring(1)

export default function show({ navigation }) {
  const { user, ipaddress } = useUser()
  const [data, setdata] = useState()
  const isFocused = useIsFocused()
  const [checked, setchecked] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/Customers/showschedule?id=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        // setdata(json)
        const days = new Map()
        json.forEach((d) => {
          if (!days.has(d.Deleiveryday)) {
            days.set(d.Deleiveryday, [])
          }
        })

        json.forEach((d) => {
          days.get(d.Deleiveryday).push(d)
        })

        function conversionFunc([oid, orders]) {
          const routines = new Map()
          orders.forEach((r) => {
            if (!routines.has(r.Routinetype)) {
              routines.set(r.Routinetype, [])
            }
          })

          orders.forEach((r) => {
            routines.get(r.Routinetype).push(r)
          })
          function conversionFunc2([oid, orders]) {
            const foods = orders.map((order) => ({
              fname: order.fName,
              quantity: order.quantity,
              FImage: order.FImage,
              rcname: order.rcname,
              mid: order.mid,
              activatestatus: order.activatestatus,
            }))
            return { routine: orders[0].Routinetype, foods: foods }
          }
          return {
            day: orders[0].Deleiveryday,
            dtime: orders[0].dtime,
            routines: Array.from(routines, conversionFunc2),
          }
        }

        setdata(Array.from(days, conversionFunc))
      })
      .catch((error) => alert(error))
    return () => setdata(null)
  }, [refreshing, isFocused])
  const [daydata, setdaydata] = useState()
  // function dropdowndaysearch(day) {
  //   fetch(
  //     'http://' + ipaddress + '/fypapi/api/schedule/showschedule?d=' + day + ''
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       //setdaydata(json)
  //     })
  //     .catch((error) => alert(error))
  // }

  const updateactivestatus = (mid, status) => {
    console.log(status, mid)
    if (status === true) {
      status = false
    } else {
      status = true
    }
    console.log(mid, status)
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/schedule/updateactivestatus?mid=' +
        mid +
        '&status=' +
        status +
        ''
    )
    onRefresh()
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(500).then(() => setRefreshing(false))
  }, [])

  function deleteschedule(mid) {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/schedule/Deleteschedule?mid=' +
        mid +
        ''
    ).catch((error) => alert(error))
  }

  return (
    <View style={styles.mainConatinerStyle}>
      <View>
        <FlatList
          data={data}
          //  keyExtractor={(item) => item.fid.toString()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={{ margin: 10 }}>
              <Card.Content>
                <Title>{capitalize(item.day)}</Title>
                <Title>
                  {item.dtime.split(':').splice(0, 1)}:
                  {item.dtime.split(':').splice(1, 1)}
                </Title>
                {item.routines.map((r) => (
                  <>
                    <Text>Meal: {capitalize(r.routine)}</Text>
                    {r.foods.map((f, i) => (
                      <ListItem avatar>
                        <Left>
                          <Thumbnail
                            square
                            source={{
                              uri: 'data:image/jpeg;base64,' + f.FImage,
                            }}
                          />
                        </Left>
                        <Body>
                          <Text>{f.fname}</Text>
                          <Text>{f.rcname}</Text>
                          <Text>{f.quantity}</Text>
                        </Body>
                        <Right>
                          <Ionicons
                            name="md-trash"
                            size={28}
                            color="#ee4d2d"
                            onPress={() => deleteschedule(item.mid)}
                          />
                          <Ionicons
                            name={
                              f.activatestatus
                                ? 'ios-checkmark-circle'
                                : 'ios-checkmark-circle-outline'
                            }
                            size={28}
                            color={f.activatestatus ? '#0faf9a' : '#aaaaaa'}
                            onPress={() =>
                              updateactivestatus(f.mid, f.activatestatus)
                            }
                          />
                          {/* <View style={[styles.centerElement, { width: 60 }]}>
                            <TouchableOpacity
                              style={[
                                styles.centerElement,
                                { width: 40, height: 40 },
                              ]}
                              // onPress={() => this.selectHandler(i, item.checked)}
                            >
                              <Ionicons
                                name={
                                  item.activatestatus
                                    ? 'ios-checkmark-circle'
                                    : 'ios-checkmark-circle-outline'
                                }
                                size={25}
                                color={checked == 1 ? '#0faf9a' : '#aaaaaa'}
                                onPress={() =>
                                  updateactivestatus(
                                    item.mid,
                                    item.activatestatus,
                                    item.oid
                                  )
                                }
                              />
                            </TouchableOpacity>
                            <Ionicons
                              name="md-trash"
                              size={25}
                              color="#ee4d2d"
                            />
                          </View> */}
                        </Right>
                      </ListItem>
                    ))}
                  </>
                ))}
              </Card.Content>
            </Card>
          )}
        />

        {/* <FlatList
          data={data}
          //  keyExtractor={(item) => item.fid.toString()}
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
                  <Text style={{ fontWeight: 'bold' }}>Food name:</Text>
                  <Text>Qty: </Text>
                  <Text>Meal:</Text>
                  <Text>Day: </Text>
                  <Text>DTIme: </Text>
                </Body>
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>{item.fName}</Text>
                  <Text>{item.quantity}</Text>
                  <Text>{item.Routinetype}</Text>
                  <Text>{item.Deleiveryday}</Text>
                  <Text>{item.dtime}</Text>
                </Body>
                <Right>
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 40, height: 40 }]}
                      // onPress={() => this.selectHandler(i, item.checked)}
                    >
                      <Ionicons
                        name={
                          item.activatestatus
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={40}
                        color={checked == 1 ? '#0faf9a' : '#aaaaaa'}
                        onPress={() =>
                          updateactivestatus(
                            item.mid,
                            item.activatestatus,
                            item.oid
                          )
                        }
                      />
                    </TouchableOpacity>
                    <Text></Text>
                    <Ionicons name="md-trash" size={40} color="#ee4d2d" />
                  </View>
                  <Right></Right>
                </Right>
              </ListItem>
            </List>
          )}
        /> */}
      </View>
      <TouchableOpacity
        style={styles.floatingMenuButtonStyle}
        onPress={() => navigation.navigate('schadule')}
      >
        <Text style={{ fontSize: 60 }}>+</Text>
      </TouchableOpacity>
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
