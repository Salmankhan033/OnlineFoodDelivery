import React, { useState, useEffect } from 'react'
import MapView, { Marker, Circle, Polyline } from 'react-native-maps'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native'
import { getDistance } from 'geolib'
import { useUser } from '../Context/UserContext'
import * as Location from 'expo-location'
export default function App({ navigation, route }) {
  const [data, setData] = useState()
  const { ipaddress, user } = useUser()
  const [isLoading, setLoading] = useState(true)
  const resloc = route.params.paramkey

  console.log(resloc)
  var dis = getDistance(
    { latitude: resloc.lat, longitude: resloc.long },
    { latitude: 33.6007, longitude: 73.0679 }
  )
  console.log('distance in meters ', dis)
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6007,
          longitude: 73.0679,
          latitudeDelta: 0.25,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: 33.6007,
            longitude: 73.0679,
          }}
          title={'DeliveryBOy'}
        ></Marker>
        <Marker
          coordinate={{
            latitude: resloc.lat,
            longitude: resloc.long,
          }}
          title={resloc.title}
        >
          {/* <Image
            style={styles.logo}
            source={require('../components/images/resmarker-removebg-preview.png')}
          /> */}
        </Marker>
        <Polyline
          coordinates={[
            { latitude: resloc.lat, longitude: resloc.long },
            { latitude: 33.6007, longitude: 73.0679 },
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          tappable={true}
          strokeWidth={6}
          onPress={() => alert('asfd', { dis })}
        />
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
  logo: {
    width: 100,
    height: 100,
  },
})
