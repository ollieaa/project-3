import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Activities = () => {
  const [restaurantData, updateRestaurantData] = useState([])

  useEffect(() => {
    axios.get('/api/restaurants')
      .then(resp => {
        updateRestaurantData(resp.data)
      })
  }, [])

  return <div>


    <section className="section">
      <div className="container">
        <h2 className="title">Eating and drinking</h2>
        <h2 className="subtitle">Our recommendations for you</h2>


        <div className="restaurant-container">

          <div className="button is-success"><Link to='/activities/create-restaurant'>Add somewhere new!</Link></div>

          <div className="scrolling-wrapper">
            {restaurantData.slice(0, 10).map((restaurant, index) => {
              return <div key={index} className="hscroll-card">
                <Link to={`/activities/${restaurant._id}`}>
                  <div className="scrolling-card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{restaurant.name}</p>
                          <p className="subtitle is-6">{restaurant.category}</p>
                          <p className="subtitle is-6"> Upvotes: {restaurant.upVotes}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={restaurant.image} alt={restaurant.name} />
                      </figure>
                    </div>
                  </div>
                </Link>
              </div>
            })}
            <div className="button is-success"><Link to='/activities/food-and-drink'>See more</Link></div>
          </div>

        </div>

      </div>

    </section>
  </div>
}


export default Activities