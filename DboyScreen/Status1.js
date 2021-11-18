import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
export default function status({ navigation }) {
  return (
    <View style={styles.mainConatinerStyle}>
      <View
        style={{
          height: hp('10%'),
          width: wp('100%'),
          borderWidth: 1,
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Text style={styles.text}> Current status</Text>
        <Text>Working</Text>
      </View>
      <View
        style={{
          height: hp('30%'),
          width: wp('100%'),
          borderWidth: 1,
          padding: 20,
        }}
      >
        <Text style={styles.text}>Current Shift</Text>

        <Text>Time</Text>
        <Text style={styles.text1}>16:00-20:00</Text>
        <Text>Zone</Text>
        <Text style={styles.text1}>Khana pul</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Deliveries')}>
          <Text>Report issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
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
