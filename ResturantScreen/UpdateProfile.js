import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Platform,
  ScrollView,
  ToastAndroid,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useUser } from '../Context/UserContext'
import { NavigationContainer } from '@react-navigation/native'
export default function ResturantSignup({ navigation }) {
  const [oname, onchangeoname] = useState('')
  const [bname, onchangebname] = useState('')
  const [number, onchangenumber] = useState('')
  const [address, onchangeadress] = useState('')
  const [password, onchangepassword] = useState('')
  const [email, onChangeemail] = useState('')
  const [city, oncitychange] = useState('')
  const [type, onchangetype] = useState('')
  const [image, onImagePick] = useState(null)
  const { ipaddress, user } = useUser()
  useEffect(() => {
    fetch(
      'http://' +
        ipaddress +
        '/fypapi/api/Resturant/Resturantprofile?id=' +
        user.u_id +
        ''
    )
      .then((response) => response.json())
      .then((json) => {
        onchangeoname(json[0].ownername)
        onchangebname(json[0].rcname)
        onImagePick(json[0].rcImage)
        onChangeemail(json[0].rcemail)
        onchangepassword(json[0].rpassword)
        onchangeadress(json[0].rcaddress)
        onchangetype(json[0].Category)
        oncitychange(json[0].rccity)
        onchangenumber(json[0].rcnumber)
      })
      .catch((error) => alert(error))
  }, [])
  const Postdata = () => {
    if (image == null) {
      alert('fill the feilds')
    } else {
      try {
        let result = fetch(
          'http://' + ipaddress + '/fypapi/api/resturant/modifyResturant',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rid: user.u_id,
              rcname: bname,
              rcaddress: address,
              rccity: city,
              rcemail: email,
              rpassword: password,
              rcImage: image,
              Category: type,
              ownername: oname,
            }),
          }
        )
        ToastAndroid.showWithGravity(
          'Updated ',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      } catch (e) {
        console.log(e)
      }
      navigation.navigate('Profile')
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      onImagePick(result.base64)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.setText}>Image</Text>

      {image !== null ? (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + image }}
          style={{ width: 350, height: 100, alignItems: 'center' }}
        />
      ) : null}
      <Button
        style={{ Color: '#1c313a' }}
        title="Browse Image"
        onPress={pickImage}
      />
      <Text style={styles.setText}> Owner Name</Text>
      <TextInput
        style={styles.inputBox}
        value={oname}
        onChangeText={onchangeoname}
      />
      <Text style={styles.setText}>Bussiness Name</Text>
      <TextInput
        style={styles.inputBox}
        value={bname}
        onChangeText={onchangebname}
      />

      <Text style={styles.setText}>Phone Number</Text>
      <TextInput
        style={styles.inputBox}
        value={number}
        onChangeText={onchangenumber}
      />
      <Text style={styles.setText}>Email</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeemail}
      />
      <Text style={styles.setText}>Address</Text>
      <TextInput
        style={styles.inputBox}
        value={address}
        onChangeText={onchangeadress}
      />
      <Text style={styles.setText}>Type</Text>
      <DropDownPicker
        items={[
          { label: 'Resturant', value: 'Resturant' },
          { label: 'Cook', value: 'Cook' },
        ]}
        placeholder="select type"
        containerStyle={{ height: 50 }}
        style={{
          backgroundColor: '#fafafa',
          width: 350,
          justifyContent: 'center',
        }}
        value={type}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(type) => onchangetype(type.value)}
      />
      <Text style={styles.setText}>City</Text>
      <DropDownPicker
        items={[
          { label: 'Islamabad', value: 'Islamabad', hidden: true },
          { label: 'Rawalpindi', value: 'Rawalpindi' },
          { label: 'karachi', value: 'karachi' },
          { label: 'Lahore', value: 'Lahore' },
          { label: 'Haripur', value: 'Haripur' },
        ]}
        placeholder="select city"
        containerStyle={{ height: 50 }}
        value={city}
        style={{
          width: 350,
          justifyContent: 'center',
          color: 'black',
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
        value={password}
        onChangeText={onchangepassword}
      />
      <TouchableOpacity style={styles.btnbox} onPress={Postdata}>
        <Text style={styles.btntext}>update</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexGrow: 1,
    backgroundColor: '#fff',
    marginTop: 10,
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
