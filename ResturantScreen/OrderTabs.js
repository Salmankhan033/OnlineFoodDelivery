import React from 'react'
import { Container, Header, Tab, Tabs, ScrollableTab, Text } from 'native-base'
import Tab1 from '../ResturantScreen/Currentorder'
import Tab2 from '../ResturantScreen/ScheduleOrder'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()

const Screen = ({ navigation }) => {
  return (
    <Container>
      <Tabs tabBarUnderlineStyle={{ backgroundColor: '#B0E0E6' }}>
        <Tab
          heading="Orders"
          activeTextStyle={{ color: 'black', fontWeight: 'bold' }}
          textStyle={{ color: 'black', fontSize: 12 }}
          tabStyle={{ backgroundColor: '#fff' }}
          activeTabStyle={{ backgroundColor: '#fff' }}
        >
  <Tab1 />
        </Tab>

        <Tab
          heading="Schedule Order"
          activeTextStyle={{ color: 'black', fontWeight: 'bold' }}
          textStyle={{ color: 'black', fontSize: 12 }}
          tabStyle={{ backgroundColor: '#fff' }}
          activeTabStyle={{ backgroundColor: '#fff' }}
        >
          <Tab2 />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Screen
