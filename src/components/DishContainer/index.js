import {TiPlus, TiMinus} from 'react-icons/ti'
import {useState} from 'react'

import './index.css'

const DishContainer = props => {
  const [quantity] = useState(0)
  const {dishData, addToCart, removeFromCart} = props
  const {
    addonCat,
    dishAvailability,
    dishCal,
    dishCurrency,
    dishDescription,
    // dishId,
    dishImage,
    dishName,
    dishPrice,
  } = dishData

  const addInCart = () => {
    addToCart()
  }

  const removeInCart = () => {
    removeFromCart()
  }

  const showDish = dishAvailability ? (
    <div className="cart-controls">
      <TiPlus onClick={addInCart} className="buttons" />
      <p>{quantity}</p>
      <TiMinus onClick={removeInCart} className="buttons" />
    </div>
  ) : (
    <p className="not-available-text">Not Available</p>
  )

  return (
    <li className="dishes-container ">
      <div className="indicator-con">
        <div className="indicator">.</div>
      </div>
      <div className="dish-details">
        <p className="dish-name">{dishName}</p>
        <p className="dish-currency">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {showDish}
        {addonCat.length > 1 && (
          <p className="customizations-text">Customizations Available</p>
        )}
      </div>
      <div className="calories-con">
        <p>{dishCal} calories</p>
      </div>
      <div className="img-container">
        <img src={dishImage} alt={dishName} className="image" />
      </div>
    </li>
  )
}

export default DishContainer
