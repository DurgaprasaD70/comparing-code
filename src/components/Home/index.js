import {Component} from 'react'
import Loader from 'react-loader-spinner'
import DishContainer from '../DishContainer'
import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    data: [],
    activeTabItem: 'Salads and Soup',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()
    const finalData = data[0].table_menu_list
    console.log(finalData)
    const formattedData = finalData.map(eachTabItem => ({
      categoryName: eachTabItem.menu_category,
      categoryId: eachTabItem.menu_category_id,
      categoryDishes: eachTabItem.category_dishes.map(eachDish => ({
        addonCat: eachDish.addonCat,
        dishAvailability: eachDish.dish_Availability,
        dishCal: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishPrice: eachDish.dish_price,
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishImage: eachDish.dish_image,
        dishDescription: eachDish.dish_description,
      })),
    }))
    this.setState({
      data: formattedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  renderDishDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {addToCart, removeFromCart, count} = value
        const {data, activeTabItem} = this.state
        const categoryData = data.filter(
          eachOne => eachOne.categoryName === activeTabItem,
        )
        const dishesData = categoryData[0].categoryDishes
        return (
          <ul className="dishes-main-container">
            {dishesData.map(eachDish => (
              <DishContainer
                key={eachDish.dishId}
                dishData={eachDish}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                count={count}
              />
            ))}
          </ul>
        )
      }}
    </CartContext.Consumer>
  )

  renderBasedOnApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderDishDetails()
      default:
        return null
    }
  }

  onClickTabItem = newOne => {
    this.setState({activeTabItem: newOne})
  }

  render() {
    const {data, activeTabItem} = this.state
    return (
      <div className="home-container">
        <ul className="tab-list">
          {data.map(eachTab => {
            const onChangeTabItem = () => {
              this.onClickTabItem(eachTab.categoryName)
            }

            return (
              <li
                key={eachTab.categoryId}
                onClick={onChangeTabItem}
                className={
                  activeTabItem === eachTab.categoryName
                    ? 'active-tab'
                    : 'tab-item'
                }
              >
                {eachTab.categoryName}
              </li>
            )
          })}
        </ul>
        {this.renderBasedOnApi()}
      </div>
    )
  }
}

export default Home
