import React, { useState, createContext, useContext } from 'react'
const TaskContext = createContext(null)

export const useTask = () => useContext(TaskContext)

export const Provider = (props) => {
  return (
    <TaskContext.Provider value={{ cart, setCart }}>
      {props.children}
    </TaskContext.Provider>
  )
}
