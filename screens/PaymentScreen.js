import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RadioButton } from 'react-native-paper'

export default function Payment() {
  const [pay, setPay] = useState('first')
  return (
    <View>
      <View style={{ flexDirection: 'row', padding: 20, margin: 10 }}>
        <RadioButton
          value="first"
          status={pay === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setPay('first')}
        />
        <Text>pay With Card</Text>
      </View>
      <View style={{ flexDirection: 'row', padding: 20, margin: 10 }}>
        <RadioButton
          value="second"
          status={pay === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setPay('second')}
        />
        <Text>Cash on Delivery</Text>
      </View>
      {pay !== 'first' ? null : <Text>alll a card data</Text>}
    </View>
  )
}
