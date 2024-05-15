import {useState} from 'react'
import Header from './components/Header'
import Home from './components/Home'
import CartContext from './context/CartContext'

import './App.css'

// export const MyContext = createContext({
//   count: 0,
//   addToCart: () => {},
//   removeFromCart: () => {},
// })

const App = () => {
  const [count, setCount] = useState(0)

  const addToCart = () => {
    setCount(prevCount => prevCount + 1)
  }

  const removeFromCart = () => {
    setCount(prevCount => prevCount - 1)
  }
  return (
    <>
      <CartContext.Provider value={{count, addToCart, removeFromCart}}>
        <Header />
        <Home />
      </CartContext.Provider>
    </>
  )
}

export default App
