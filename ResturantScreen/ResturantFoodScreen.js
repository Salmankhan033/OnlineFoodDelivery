import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ToastAndroid,
} from 'react-native'
import { useUser } from '../Context/UserContext'
import {
  Card,
  Paragraph,
  Title,
  Button,
  Dialog,
  Portal,
} from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
export default function ResturantFoodScreen({ navigation }) {
  const isFocused = useIsFocused()

  const [data, setData] = useState()
  const { user, setUser, ipaddress } = useUser()
  const id = user.u_id

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(1000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/resturant/resturantfood?id=' +
        id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => alert(error))
    return () => setData(null)
  }, [isFocused])

  function deletefood(id, index) {
    fetch(
      'http://' + ipaddress + '/fypapi/api/fooditem/deletefood?fid=' + id + ''
    )
    ToastAndroid.showWithGravity(
      'Food Delete ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    )
    data.splice(index, 1)
    onRefresh()
  }
  const carddata = (item, index) => {
    return (
      <View style={{}}>
        <Card key={item.fid.toString()} style={{ margin: 20 }}>
          <Card.Cover
            source={{
              uri: 'data:image/jpeg;base64,' + item.fImagepath,
            }}
            style={{ width: 300, height: 100 }}
          />
          <Card.Content>
            <Title>{item.fname}</Title>
            <Paragraph>Price :{item.fprice}</Paragraph>
            <Paragraph>Type :{item.ftype}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('update', { paramkey: item.fid })
              }
            >
              <Button>Edit</Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletefood(item.fid, index)}>
              <Button>Delete</Button>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
        {/* </TouchableOpacity> */}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ borderWidth: 1 }}
        onPress={() => navigation.navigate('AddFoodItem')}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
          }}
        >
          Add Food Items +
        </Text>
      </TouchableOpacity>
      <View style={{}}></View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={(item) => item.fid.toString()}
        renderItem={({ item, index }) => <Text>{carddata(item, index)}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    width: wp('100%'),
  },
})
