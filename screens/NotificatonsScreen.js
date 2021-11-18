import React from 'react'
import { View, Text, Button } from 'react-native'
import InputSpinner from 'react-native-input-spinner'
const Screen = ({ navigation }) => {
  return (
    <View>
      <Text>Notifications</Text>
      <InputSpinner
        max={10}
        min={2}
        step={2}
        width={100}
        height={50}
        colorMax={'#f04048'}
        colorMin={'#40c5f4'}
        //value={this.state.number}
        //onChange={(num) => {
        //console.log(num);
        //}}
      />
      {/* <Button title="Setting" onPress={() => navigation.navigate('Setting')} /> */}
    </View>
  )
}
export default Screen
