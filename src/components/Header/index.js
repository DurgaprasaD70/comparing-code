import {useContext} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const contextValue = useContext(CartContext)
  const {count} = contextValue
  return (
    <div className="header-container ">
      <h1 className="main-heading">UNI Rest Cafe</h1>
      <div className="order-container">
        <p className="my-orders-text ">My Orders</p>
        <div className="cart-container">
          <IoCartOutline className="cart-icon" />
          <p className="cart-count">{count}</p>
        </div>
      </div>
    </div>
  )
}
export default Header
