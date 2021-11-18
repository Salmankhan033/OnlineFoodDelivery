import React, { useState, useEffect } from 'react'
import MapView, { Marker, Circle } from 'react-native-maps'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import * as Location from 'expo-location'
import getDistance from 'geolib/es/isPointWithinRadius'
import { useIsFocused } from '@react-navigation/native'
import { useUser } from '../Context/UserContext'

export default function App() {
  let status = false
  const { user, setUser, ipaddress } = useUser()
  const [refreshing, setRefreshing] = React.useState(false)
  const [location, setLocation] = useState(null)
  var [latt, setlatt] = useState(33.6495176)
  var [longi, setlongi] = useState(73.0702265)
  const [errorMsg, setErrorMsg] = useState(null)
  const [data, setdata] = useState()
  const isFocused = useIsFocused()
  useEffect(() => {
    fetch('http://' + ipaddress + '/fypapi/api/resturant/closeresturant')
      .then((response) => response.json())
      .then((json) => {
        setdata(json)
      })
      .catch((error) => alert(error))
    return setdata(null)
  }, [isFocused])

  // useEffect(() => {
  //   ;(async () => {
  //     let { status } = await Location.requestPermissionsAsync()
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied')
  //       return
  //     }

  //     let location = await Location.getCurrentPositionAsync({})
  //     setlongi(JSON.stringify(location.coords.longitude))
  //     setlatt(JSON.stringify(location.coords.latitude))
  //     setLocation(location)
  //   })()
  // }, [])
  const radius = (item, index) => {
    status = getDistance(
      {
        latitude: parseFloat(item.rclattitude),
        longitude: parseFloat(item.rclongitude),
      },
      {
        latitude: 33.64136078837483,
        longitude: 73.0642405897379,
      },
      5000
    )
    if (status == true) {
      console.log('condition true for ', item.rcname)
    } else {
      console.log('condition falsed for ', item.rcname)
      data.splice(index, 1)
    }
    console.log('status  is this', status)
    console.log(data)
    onRefresh()
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(0).then(() => setRefreshing(false))
  }, [])
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    })
  }
  let text = 'Waiting.' + (0 + 1) + ''
  // if (errorMsg) {
  //   text = errorMsg
  // } else if (location) {
  //   text = JSON.stringify(location.coords.latitude)
  // }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6007,
          longitude: 73.0679,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          setlatt(e.nativeEvent.coordinate.latitude),
            setlongi(e.nativeEvent.coordinate.longitude)
          console.log('newlatitiude', e.nativeEvent.coordinate.latitude)
          console.log('newlongitutde', e.nativeEvent.coordinate.longitude)
        }}
      >
        <Marker
          coordinate={{
            latitude: latt,
            longitude: longi,
          }}
          title={'title'}
          description={'description'}
        />
        {/* <Circle
          center={{
            latitude: latt,
            longitude: longi,
          }}
          radius={5000}
          strokeWidth={2}
          strokeColor="aqua"
          fillColor={'brown'}
        /> */}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
