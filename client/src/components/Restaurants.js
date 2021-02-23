import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'
import restaurantCategories from '../data/restaurants/restaurantCategories.js'

const Restaurants = () => {
  const [restaurantData, updateRestaurantData] = useState([])
  const [priceRange, updatePriceRange] = useState('Any price range')
  const [category, updateCategory] = useState('All categories')
  const [loading, updateLoading] = useState(true)
  const loggedIn = getLoggedInUserId()


  useEffect(() => {
    axios.get('/api/restaurants')
      .then(resp => {
        const filteredRestData = resp.data.filter(restaurant => {
          return restaurant.price && restaurant.category
        })
        updateRestaurantData(filteredRestData)
        updateLoading(false)
      })
  }, [])


  function filterRestaurants() {
    return restaurantData.filter(restaurant => {
      return (priceRange === 'Any price range' || restaurant.price === priceRange)
      && (category === 'All categories' || (restaurant.category.includes(category)))
    })
  }

  function NoRestaurants() {
    const filteredData = restaurantData.filter(restaurant => {
      return priceRange === 'Any price range' || restaurant.price === priceRange
    })
    if (filteredData.length < 1) {
      return <div>No restaurants found</div>
    }
    return null
  }


  if (loading) {
    return <h1>Loading</h1>
  }


  return <section className="section">
    <div className="container">
      <h2 className="title">Eating and drinking</h2>

      {
        // * DROP-DOWN FOR PRICE RANGE
      }

      <div className="select is-success">
        <select onChange={(event) => updatePriceRange(event.target.value)}>
          <option>Any price range</option>
          <option>£</option>
          <option>££</option>
          <option>£££</option>
          <option>££££</option>
        </select>
      </div>

      {
        // * DROP-DOWN FOR CATEGORIES
      }

      <div className="select is-success">
        <select onChange={(event) => updateCategory(event.target.value)}>
          <option>All categories</option>
          {restaurantCategories.map((restaurant, i) => {
            return <option value={restaurant.value} key={i}>{restaurant.label}</option>
          })}
        </select>
      </div>


      <div className="column">
        {filterRestaurants().map((restaurant, index) => {
          return <div key={index} className="column">
            <Link to={`/activities/${restaurant._id}`}>
              <div className="horizontal-card">
                <div className="horizontal-card-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className="horizontal-card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{restaurant.name}</p>
                      <p className="subtitle is-6">{restaurant.category}</p>
                      <p className="subtitle is-6"> Upvotes: {restaurant.upVotes}</p>
                      {restaurant.price && <p className="subtitle is-6">{'Price: ' + restaurant.price}</p>}
                      <p className="subtitle is-6">{'Address: ' + restaurant.address + ', ' + restaurant.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })}

        <NoRestaurants />

      </div>


    </div>
    {loggedIn && <div className="button is-success"><Link to='/activities/create-restaurant'>Add restaurant</Link></div>}
    <div className="button is-success"><Link to='/activities'>Back to activities</Link></div>
  </section>
}


export default Restaurants