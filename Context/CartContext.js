import React, { useState, createContext, useContext } from 'react'
const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export const CartProvider = (props) => {
  const [cart, setCart] = useState([])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  )
}
