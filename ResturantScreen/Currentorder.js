import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
} from 'react-native'
import { useUser } from '../Context/UserContext'

import { DataTable } from 'react-native-paper'
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Searchbar,
  Divider,
} from 'react-native-paper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
const Screen = ({ navigation }) => {
  const [data, setdata] = useState([])
  const [food, setfood] = useState()
  const { ipaddress, user } = useUser()
  const [flag, setflag] = useState(true)
  const [flag1, setflag1] = useState(true)
  const [isloading, setisLoading] = useState(true)
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    })
  }
  useEffect(() => {
    getorders()
  }, [])
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(0).then(() => setRefreshing(false))
  }, [])
  const [items, setItems] = useState(new Map())

  const getorders = () => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/resturant/resturantsimpleorder?id=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        const orders = new Map()

        json.forEach((o) => {
          if (!orders.has(o.oid)) {
            orders.set(o.oid, [])
          }
        })

        json.forEach((o) => {
          orders.get(o.oid).push(o)
        })

        function conversionFunc([oid, orders]) {
          const foods = orders.map((order) => ({
            fname: order.fName,
            foodQantity: order.foodQantity,
          }))

          return {
            oid: orders[0].oid,
            cname: orders[0].cname,
            odate: orders[0].odate,
            otime: orders[0].otime,
            cid: orders[0].cid,
            acceptstatus: orders[0].acceptstatus,
            foods: foods,
          }
        }

        setdata(Array.from(orders, conversionFunc))
      })
      .catch((error) => alert(error))
      .finally(() => setisLoading(false))
    onRefresh()
  }

  if (isloading) {
    return <ActivityIndicator size="large" />
  }
  const acceptupdate = (id) => {
    fetch('http://' + ipaddress + '/fypapi/api/resturant/acceptupdate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oid: id,
        acceptstatus: true,
        rid: user.u_id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json)
      })
  }
  const postorderstatus = (item, status, check) => {
    console.log(item.oid, item.cid)
    fetch('http://' + ipaddress + '/fypapi/api/resturant/acceptorderupdate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oid: item.oid,
        rid: user.u_id,
        acceptstatus: status,
        avalibilitystatus: 'unchecked',
        cid: item.cid,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(status)
      })
    if (status === 'cancel') {
      setflag(false)
    }
  }
  console.log(data)

  return (
    <View style={styles.container}>
      {data == null ? (
        // <Image source={require('../components/images/norder.png')} />
        <Text>nodata</Text>
      ) : (
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, i }) => (
              <Card style={{ margin: 20 }}>
                <Card.Content>
                  <Title>
                    {'Name :'}
                    {item.cname}
                  </Title>
                  <Title>
                    {'Ordernumber :'}
                    {item.oid}
                  </Title>
                  <Title>
                    {'OrderDate :'}
                    {item.odate.split('T').splice(0, 1)}
                  </Title>
                  <Title>
                    {'OrderTime :'}
                    {item.otime.split(':').splice(0, 1)}:
                    {item.otime.split(':').splice(1, 1)}
                  </Title>
                  <Title>Fooditems</Title>
                  {item.foods.map((food, i) => (
                    <>
                      <Text numberOfLines={1}>Name:{food.fname}</Text>
                      <Text numberOfLines={1}>qty:{food.foodQantity}</Text>
                      <Divider style={{ borderWidth: 1 }} />
                    </>
                  ))}
                  <View style={{ padding: 20 }}>
                    <Button
                      title="Accept"
                      disabled={flag ? false : true}
                      onPress={() => postorderstatus(item, 'accept', true)}
                    />
                  </View>
                  <View style={{ padding: 20 }}>
                    <Button
                      title="cancel"
                      disabled={flag1 ? false : true}
                      onPress={() => {
                        postorderstatus(item, 'cancel', false)
                      }}
                    />
                  </View>
                </Card.Content>
              </Card>
            )}
          />
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </ScrollView>
      )}
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
export default Screen

/////////////////////////////////////////bafzool data////////////////////////////////////////////////////////////
// const foodi = (id) => {
//   fetch(
//     'http://' +
//       ipaddress +
//       '/fypapi/api/resturant/currentorderdetail?id=' +
//       id +
//       ''
//   )
//     .then((response) => response.json())
//     .then((json) => {
//       setfood(json)
//     })
//     .catch((error) => alert(error))
// }
// setInterval(() => {
//   getorders
//   console.log('interval run')
// }, 100000)
