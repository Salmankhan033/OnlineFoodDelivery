import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import * as Location from 'expo-location'
import { useUser } from '../Context/UserContext'
import DropDownPicker from 'react-native-dropdown-picker'
export default function UserSignup() {
  const [name, onchangename] = useState('')
  const [number, onchangenumber] = useState('')
  const [address, onchangeadress] = useState('')
  const [password, onchangepassword] = useState('')
  const [email, onChangeemail] = useState('')
  const [city, oncitychange] = useState('')
  const [location, setLocation] = useState(null)
  const [latt, setlatt] = useState()
  const [longi, setlongi] = useState()
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      //   let { status } = await Location.requestPermissionsAsync()
      //   if (status !== 'granted') {
      //     setErrorMsg('Permission to access location was denied')
      //     return
      //   }
      let location = await Location.getCurrentPositionAsync({})
      setlongi(JSON.stringify(location.coords.longitude))
      setlatt(JSON.stringify(location.coords.latitude))
      setLocation(location)
    })()
  }, [])
  let text = 'Waiting.' + (0 + 1) + ''
  if (errorMsg) {
    text = errorMsg
    alert('permission are not granted')
  }
  console.log(longi)
  console.log(latt)
  const Postdata = () => {
    if (password == '' && email == '') {
      ToastAndroid.showWithGravity(
        'Fill The Field',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    } else {
      try {
        fetch('http://' + ipaddress + '/fypapi/api/customers/addcustomers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cname: name,
            cemail: email,
            cAddrees: address,
            ccity: city,
            cnumber: number,
            cpassword: password,
            clongitude: parseFloat(longi),
            clattitude: parseFloat(latt),
          }),
        })
        ToastAndroid.showWithGravity(
          'Saved',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      } catch (e) {
        console.log(e)
      }
    }
  }
  const { user, setUser, ipaddress } = useUser()
  return (
    <View style={styles.container}>
      <Text style={styles.setText}>Name</Text>
      <TextInput style={styles.inputBox} onChangeText={onchangename} />
      <Text style={styles.setText}>Phone Number</Text>
      <TextInput style={styles.inputBox} onChangeText={onchangenumber} />
      <Text style={styles.setText}>Email</Text>
      <TextInput style={styles.inputBox} onChangeText={onChangeemail} />
      <Text style={styles.setText}>Address</Text>
      <TextInput style={styles.inputBox} onChangeText={onchangeadress} />
      <Text style={styles.setText}>City</Text>

      <DropDownPicker
        items={[
          { label: 'Islamabad', value: 'Islamabad', hidden: true },
          { label: 'Rawalpindi', value: 'Rawalpindi' },
          { label: 'karachi', value: 'karachi' },
          { label: 'Lahore', value: 'Lahore' },
          { label: 'Haripur', value: 'Haripur' },
        ]}
        containerStyle={{ height: 40 }}
        style={{
          backgroundColor: '#fafafa',
          width: 350,
          justifyContent: 'center',
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(city) => oncitychange(city.value)}
      />

      <Text style={styles.setText}>Password</Text>
      <TextInput
        style={styles.inputBox}
        secureTextEntry={true}
        onChangeText={onchangepassword}
      />
      <TouchableOpacity style={styles.btnbox} onPress={Postdata}>
        <Text style={styles.btntext}>SignUp</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  setText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputBox: {
    marginVertical: 10,
    width: 350,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  btnbox: {
    width: 350,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
})
