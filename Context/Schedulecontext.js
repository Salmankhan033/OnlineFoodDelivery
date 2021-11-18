import React, { useState, createContext, useContext } from 'react'
const ScheduleContext = createContext(null)

export const useSchedule = () => useContext(ScheduleContext)

export const ScheduleProvider = (props) => {
  const [menu, setMenu] = useState([])
  const [pickfood, setPickfood] = useState([])

  return (
    <ScheduleContext.Provider value={{ menu, setMenu, pickfood, setPickfood }}>
      {props.children}
    </ScheduleContext.Provider>
  )
}
