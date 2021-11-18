import React, { useState, createContext, useContext } from 'react'
const DboyContext = createContext(null)

export const useDboy = () => useContext(DboyContext)

export const DboyProvider = (props) => {
  const [location, setlocation] = useState([])
  return (
    <DboyContext.Provider value={{ location, setlocation }}>
      {props.children}
    </DboyContext.Provider>
  )
}
