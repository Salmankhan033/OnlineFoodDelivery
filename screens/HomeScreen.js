import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Searchbar,
} from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  Modal,
  Button,
} from 'react-native'
import { useUser } from '../Context/UserContext'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useIsFocused } from '@react-navigation/native'
export default function Home({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const { user, setUser, ipaddress } = useUser()
  const [value, setvalue] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false)
  const [customer, setcustomer] = useState()
  const [alert, setAlert] = useState()
  const onRefresh = () => {
    setRefreshing(true)
  }
  useEffect(() => {
    fetch('http://' + ipaddress + '/fypapi/api/resturant/allresturant')
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        setRefreshing(false)
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false))
    return () => setData(null)
  }, [refreshing])
  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/customers/customerAlerts?cid=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        setAlert(json)
        if (json.length > 0) {
          setModalVisible(true)
        }
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false))
    return () => {
      return () => setAlerts(null)
    }
  }, [])

  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/customers/customerprofile?id=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        setcustomer(json)
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false))

    return () => setcustomer(null)
  }, [])
  useEffect(
    function searchresturant() {
      // const search = data.filter(
      //   (element) => element.rcname.toLowerCase() === value.toLowerCase()
      // )
      // return search
      if (value === '') {
        fetch('http://' + ipaddress + '/fypapi/api/resturant/allresturant')
          .then((response) => response.json())
          .then((json) => {
            setData(json)
            setRefreshing(false)
          })
          .catch((error) => alert(error))
        return
      }

      fetch(
        'http://' +
          ipaddress +
          '/fypapi/api/resturant/Searchresturant?name=' +
          value +
          ''
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => alert(error))
      return () => setData(null)
    },
    [value]
  )
  if (isLoading) {
    return <ActivityIndicator size={'large'}></ActivityIndicator>
  }
  const updatecancel = (osid) => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/resturant/updatealert?osid=' +
        osid +
        ''
    )
  }

  const carddata = (item) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('fooditem', { paramkey: item.rid })
          }
          style={{
            borderRadius: 5,
            borderColor: 'black',
            borderWidth: 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <Card key={item.rid.toString()} style={{ margin: 20 }}>
              <Card.Cover
                source={{ uri: 'data:image/jpeg;base64,' + item.rcImage }}
                style={{ width: wp('75%'), height: 100 }}
              />
              <Card.Content>
                <Title>{item.rcname}</Title>
                <Paragraph>{item.rcaddress}</Paragraph>
                <Paragraph>{item.rcemail}</Paragraph>
                <Paragraph>{item.Category}</Paragraph>
              </Card.Content>
            </Card>
          )}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container1}>
        <View></View>
        <View
          style={{ flexDirection: 'row', paddingBottom: 10, width: wp('100%') }}
        >
          <Searchbar
            style={{
              borderRadius: 25,
              width: 250,
              borderWidth: 1,
              height: 50,
            }}
            onChangeText={setvalue}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('showschadule')}
            style={{
              margin: 10,
              width: 50,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
            }}
          >
            <Image
              style={{ width: 50, height: 30, borderRadius: 10 }}
              source={require('../components/images/schdule.png')}
            />
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{carddata(item)}</Text>}
          />
        )}
        <StatusBar backgroundColor="#1c313a" />
      </ScrollView>
      <Modal
        animationType="slide"
        //transparent={true}
        height={200}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.container}>
          <View style={styles.reviewContainer}>
            <Text style={styles.title}>Alert</Text>
            <View style={styles.totalWrap}></View>
            {/* <FlatList
              data={alert}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, i }) => (
                <View>
                  <Text>{item.rcname}</Text>
                </View>
              )}
            /> */}
            <Text style={styles.textStyle}>
              {/* {alert.map((r, i) => (
                <Text>
                  {i.toString()}
                  {r.rcname}
                  {'\t\t\t\t'}
                </Text>
              ))} */}
            </Text>
            <Text>cancel your order</Text>

            <View style={{ paddingBottom: 5 }}>
              <Button
                title="Rebook"
                color="#008b8b"
                onPress={() => {
                  navigation.navigate('schadule')
                  setModalVisible(false)
                  updatecancel(alert[0].osid)
                }}
              />
            </View>
            <View>
              <Button
                title="Cancel"
                color="#008b8b"
                onPress={() => {
                  setModalVisible(false)
                  updatecancel(alert[0].osid)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container1: {
    padding: wp('6%'),
    backgroundColor: '#fff',
    width: wp('100%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalWrap: {
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#F5F8FF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  reviewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
    minWidth: '80%',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
    shadowColor: 'rgba(193, 211, 251, 0.5)',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#323357',
    textAlign: 'center',
  },
})
