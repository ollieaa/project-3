import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Restaurants = () => {
  const [restaurantData, updateRestaurantData] = useState([])
  const [priceRange, updatePriceRange] = useState('All price categories')
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/restaurants')
      .then(resp => {
        const filteredRestData = resp.data.filter(restaurant => {
          return restaurant.price
        })
        updateRestaurantData(filteredRestData)
        updateLoading(false)
      })
  }, [])

  function filterRestaurants() {
    return restaurantData.filter(restaurant => {
      return priceRange === 'All price categories' || restaurant.price === priceRange 
    })
  }

  function NoRestaurants() {
    const filteredData = restaurantData.filter(restaurant => {
      return priceRange === 'All price categories' || restaurant.price === priceRange 
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
      <div className="select is-danger">
        <select onChange={(event) => updatePriceRange(event.target.value)}>
          <option>All price categories</option>
          <option>£</option>
          <option>££</option>
          <option>£££</option>
          <option>££££</option>
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
    <div className="button is-success"><Link to='/activities/create-restaurant'>Add restaurant</Link></div>
    <div className="button is-success"><Link to='/activities'>Back to activities</Link></div>
  </section>
}


export default Restaurants