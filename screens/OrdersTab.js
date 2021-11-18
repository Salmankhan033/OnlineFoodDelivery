import React from 'react'
import { Container, Header, Tab, Tabs, ScrollableTab, Text } from 'native-base'
import Tab1 from './Orderdetail'

const Screen = () => {
  return (
    <Container style={{ paddingTop: 30 }}>
      <Tabs tabBarUnderlineStyle={{ backgroundColor: '#B0E0E6' }}>
        <Tab
          heading="Tab1"
          activeTextStyle={{ color: 'black', fontWeight: 'bold' }}
          textStyle={{ color: 'black', fontSize: 12 }}
          tabStyle={[{ backgroundColor: '#fff' }]}
          activeTabStyle={{ backgroundColor: '#fff' }}
        >
          <Tab1 />
        </Tab>

        <Tab
          heading="Tab2"
          activeTextStyle={{ color: 'black', fontWeight: 'bold' }}
          textStyle={{ color: 'black', fontSize: 12 }}
          tabStyle={{ backgroundColor: '#fff' }}
          activeTabStyle={{ backgroundColor: '#fff' }}
        ></Tab>
      </Tabs>
    </Container>
  )
}

export default Screen
