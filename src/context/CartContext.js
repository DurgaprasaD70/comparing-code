import React from 'react'

const CartContext = React.createContext({
  count: 0,
  addToCart: () => {},
  removeFromCart: () => {},
})

export default CartContext
