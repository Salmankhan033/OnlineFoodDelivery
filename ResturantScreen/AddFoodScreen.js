import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useUser } from '../Context/UserContext'

export default function AddFoodScreen({ navigation }) {
  const [image, onImagePick] = useState(null)
  const [fname, setfname] = useState()
  const [type, settype] = useState()
  const { user, ipaddress } = useUser()
  const [cook, setcook] = useState()
  const [price, setprice] = useState()
  const [discount, setdiscount] = useState()
  const [imageuri, setimageuri] = useState()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      onImagePick(result.base64)
      setimageuri(result.uri)
    }
  }
  const Postdata = () => {
    try {
      fetch('http://' + ipaddress + '/fypapi/api/fooditem/addfood', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FName: fname,
          FImage: image,
          Ftype: type,
          fprice: price,
          fdiscount: discount,
          fcooktime: cook,
          rid: user.u_id,
        }),
      })
      alert('saved')
    } catch (e) {
      console.log(e)
    }
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.setText}>Image</Text>
      {image !== null ? (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + image }}
          style={{ width: 200, height: 100 }}
        />
      ) : null}
      <Button style={{ Color: '#1c313a' }} title="Browse" onPress={pickImage} />
      <Text style={styles.setText}>Food Name</Text>
      <TextInput style={styles.inputBox} onChangeText={setfname} />
      <Text style={styles.setText}>Type</Text>
      <TextInput style={styles.inputBox} onChangeText={settype} />
      <Text style={styles.setText}>Pirce</Text>
      <TextInput style={styles.inputBox} onChangeText={setprice} />
      <Text style={styles.setText}>Discount</Text>
      <TextInput style={styles.inputBox} onChangeText={setdiscount} />
      <Text style={styles.setText}>Cooking Time</Text>
      <TextInput style={styles.inputBox} onChangeText={setcook} />
      <TouchableOpacity style={styles.btnbox} onPress={Postdata}>
        <Text style={styles.btntext}>Add Food</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  setbtn: {
    color: '#1c313a',
  },
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
