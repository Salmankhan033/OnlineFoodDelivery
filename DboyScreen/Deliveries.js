import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
export default function status({ navigation }) {
  return (
    <View style={styles.mainConatinerStyle}>
      <Text style={styles.text}>New Delivery</Text>
      <View
        style={{
          height: hp('10%'),
          width: wp('100%'),
          borderWidth: 1,
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 10,
          flexDirection: 'row',
          backgroundColor: '#faebd7',
        }}
      >
        <Text style={{ marginRight: 100 }}>Order Number :56 </Text>
        <TouchableOpacity>
          <Text style={{ color: 'blue' }}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: 'blue', marginLeft: 20 }}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
})
