import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useSchedule } from '../Context/Schedulecontext'
import { useUser } from '../Context/UserContext'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs()

const Screen = ({ navigation }) => {
  const [day, setDay] = useState('')
  const [meal, setMeal] = useState('')
  const [time, setTime] = useState('')
  const [ddate, setdddate] = useState('')

  const { menu, setMenu } = useSchedule()
  const { pickfood, setPickfood } = useSchedule()
  const { user, ipaddress } = useUser()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  var date =
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() + 1) +
    '-' +
    new Date().getDate()
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    const t = new Date(date)
    let d = t.getDay()

    hideDatePicker()
    setdddate(t.toLocaleDateString())
    setTime(t.toLocaleTimeString())
    if (d === 0) {
      setDay('sunday')
    } else if (d === 1) {
      setDay('monday')
    } else if (d === 2) {
      setDay('tuesday')
    } else if (d === 3) {
      setDay('wednesday')
    } else if (d === 4) {
      setDay('thursday')
    } else if (d === 5) {
      setDay('friday')
    } else if (d === 6) {
      setDay('saturday')
    }
  }

  const postScheduleorder = () => {
    try {
      fetch('http://' + ipaddress + '/fypapi/api/order/addorders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          odate: date,
          deliverydate: ddate,
          otime: time,
          status: 'pending',
          Totalbill: 1000,
          cid: user.u_id,
          SchduleStatus: true,
          activatestatus: true,
          schday: day,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          ScheduleFood(json)
          postschedule(json)
        })
        .catch((error) => alert(error))
    } catch (e) {
      console.log(e)
    }
    navigation.navigate('showschadule')
    setPickfood([])
  }
  function postschedule(json) {
    for (let i = 0; i < pickfood.length; i++) {
      try {
        let result = fetch(
          'http://' + ipaddress + '/fypapi/api/schedule/addschedule',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Deleiveryday: day,
              dtime: time,
              Routinetype: meal,
              quantity: pickfood[i].qty,
              fid: pickfood[i].fid,
              cid: user.u_id,
              activatestatus: 1,
              oid: json,
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            alert('schedule save')
          })
      } catch (e) {
        console.log(e)
      }
    }
  }
  function ScheduleFood(json) {
    for (let i = 0; i < pickfood.length; i++) {
      try {
        fetch('http://' + ipaddress + '/fypapi/api/order/Addorderdetail', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oid: json,
            fid: pickfood[i].fid,
            foodqantity: pickfood[i].qty,
          }),
        })
        alert('foo detail saves')
      } catch (e) {
        console.log(e)
      }
    }
    return
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 20 }}>
      <ScrollView>
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Week End</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={{ marginLeft: 80 }}
            value={isEnabled}
          />
        </View>
        <Text style={styles.text}>Day</Text>
        {!isEnabled ? (
          <DropDownPicker
            items={[
              { label: 'Monday', value: 'Monday' },
              { label: 'Tuesday', value: 'Tuesday' },
              { label: 'Wednesday', value: 'Wednesday' },
              { label: 'Thurday', value: 'Thursday' },
              { label: 'Friday', value: 'Friday' },
            ]}
            containerStyle={{ height: 50 }}
            style={{
              backgroundColor: '#fafafa',
              width: 350,
              justifyContent: 'center',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(day) => setDay(day.value)}
          />
        ) : (
          <DropDownPicker
            items={[
              { label: 'Monday', value: 'Monday' },
              { label: 'Tuesday', value: 'Tuesday' },
              { label: 'Wednesday', value: 'Wednesday' },
              { label: 'Thurday', value: 'Thursday' },
              { label: 'Friday', value: 'Friday' },
              { label: 'Saturday', value: 'Saturday' },
              { label: 'Sunday', value: 'Sunday' },
            ]}
            containerStyle={{ height: 50 }}
            style={{
              backgroundColor: '#fafafa',
              width: 350,
              justifyContent: 'center',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(day) => setDay(day.value)}
          />
        )} */}

        <Text style={styles.text}>Meal</Text>
        <DropDownPicker
          items={[
            { label: 'Break Fast', value: 'breakfast' },
            { label: 'Lunch', value: 'lunch' },
            { label: 'Dinner', value: 'dinner' },
          ]}
          containerStyle={{ height: 50 }}
          style={{
            backgroundColor: '#fafafa',
            width: 350,
            justifyContent: 'center',
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(meal) => setMeal(meal.value)}
        />
        <Text style={styles.text}>
          PickedTime{'\t\t\t\t\t\t\t\t\t'}
          {time}
        </Text>
        <Text style={styles.text}>
          PickedDate{'\t\t\t\t\t\t\t\t\t'}
          {ddate}
        </Text>
        <Text
          style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}
        ></Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>DateTIMEPICKER</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>

      <View
        style={{
          backgroundColor: '#fff',
          borderTopWidth: 2,
          borderColor: '#f6f6f6',
          paddingVertical: 5,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text></Text>
            <View
              style={{
                flexDirection: 'row',
                paddingRight: 20,
                alignItems: 'center',
              }}
            >
              {/* <Text style={{ color: '#8f8f8f' }}>SubTotal: </Text>
              <Text>1000</Text> */}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.centerElement, { width: 60 }]}>
            <TouchableOpacity
              style={[styles.centerElement, { width: 32, height: 32 }]}
              //  onPress={() => this.selectHandlerAll(selectAll)}
            ></TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>Select All</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingRight: 20,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: '#1c313a',
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => navigation.navigate('Resturant')}
              >
                <Text style={{ color: '#ffffff' }}>Choose Food</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 32,
            paddingRight: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[
              styles.centerElement,
              {
                backgroundColor: '#1c313a',
                width: 100,
                height: 25,
                borderRadius: 5,
              },
            ]}
            onPress={() => {
              if (pickfood.length < 1) {
                alert('choose food')
              } else {
                postScheduleorder()
              }
            }}
          >
            <Text style={{ color: '#ffffff' }}>Add Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity
          style={styles.btnbox}
          onPress={() => {
            if (cart.length === 0) {
              alert('there is no food in a cart')
            } else {
              order()
              setCart([])
            }
          }}
        >
          <Text style={styles.btntext}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnbox}>
          <Text style={styles.btntext}>Total Bill</Text>
        </TouchableOpacity> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 15,
  },
  btnbox: {
    width: 350,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  centerElement: { justifyContent: 'center', alignItems: 'center' },
  button: {
    backgroundColor: '#1c313a',
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 5,
    marginVertical: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Screen
