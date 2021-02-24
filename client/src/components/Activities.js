import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

const Activities = () => {
  const [restaurantData, updateRestaurantData] = useState([])
  const [poiData, updatePoiData] = useState([])
  const loggedIn = getLoggedInUserId()


  useEffect(() => {
    axios.get('/api/restaurants')
      .then(resp => {
        updateRestaurantData(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get('/api/poi')
      .then(resp => {
        updatePoiData(resp.data)
      })
  }, [])

  return <div>


    <section className="section hero is-warning">
      <div className="container">
        <h2 className="title">Eating and drinking</h2>
        <h2 className="subtitle">Our recommendations for you</h2>


        <div className="restaurant-container">

          {loggedIn && <div className="button is-success"><Link to='/activities/create-restaurant'>Add restaurant</Link></div>}
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

    <section className="section">
      <div className="container">
        <h2 className="title">Get out and about</h2>
        <h2 className="subtitle">Our recommendations for you</h2>


        <div className="poi-container">

          {loggedIn && <div className="button is-success"><Link to='/activities/create-restaurant'>Add Place</Link></div>}
          <div className="scrolling-wrapper">
            {poiData.slice(0, 10).map((poi, index) => {
              if (poi.category === 'outdoor')
                return <div key={index} className="hscroll-card">
                  <Link to={`/poi/${poi._id}`}>
                    <div className="scrolling-card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-4">{poi.name}</p>
                            <p className="subtitle is-6">{poi.types}</p>
                            <p className="subtitle is-6"> Upvotes: {poi.upVotes}</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img src={poi.image} alt={poi.name} />
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

    <section className="section hero is-warning">
      <div className="container">
        <h2 className="title">Fancy some culture?</h2>
        <h2 className="subtitle">Our recommendations for you</h2>


        <div className="poi-container">

          {loggedIn && <div className="button is-success"><Link to='/activities/create-restaurant'>Add Place</Link></div>}
          <div className="scrolling-wrapper">
            {poiData.slice(0, 10).map((poi, index) => {
              if (poi.category === 'indoor')
                return <div key={index} className="hscroll-card">
                  <Link to={`/poi/${poi._id}`}>
                    <div className="scrolling-card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-4">{poi.name}</p>
                            <p className="subtitle is-6">{poi.types}</p>
                            <p className="subtitle is-6"> Upvotes: {poi.upVotes}</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img src={poi.image} alt={poi.name} />
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