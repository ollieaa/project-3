import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth'
import Geography from '../components/Map.js'
import MapGL, { Marker } from 'react-map-gl'
import RingLoader from 'react-spinners/RingLoader'


export default function SingleRestaurant({ match, history }) {
  const restaurantId = match.params.restaurantId
  const [restaurant, updateRestaurant] = useState([])
  const [user, updateUser] = useState('')
  const [loading, updateLoading] = useState(true)
  const token = localStorage.getItem('token')
  const loggedIn = getLoggedInUserId()
  const [mapConfig, setMapConfig] = useState({
    height: '45vh',
    width: '100vh',
    zoom: 16
  })
  let map

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const { data } = await axios.get(`/api/restaurants/${restaurantId}`)
        console.log(data.creator._id)
        updateRestaurant(data)
        setMapConfig({ ...mapConfig, latitude: data.lat, longitude: data.long })

        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRestaurant()
  }, [])

  if (mapConfig.lat) {
    map = <div className='map-container'>
      <Geography config={mapConfig} />
    </div>
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { data } = await axios.get(`/api/user/${getLoggedInUserId()}`)
        updateUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCurrentUser()
  }, [])

  async function handleAddToWishlist() {
    const newWishlist = user.restaurantWishlist.concat(restaurantId)
    await axios.put(`/api/user/${user._id}`, { restaurantWishlist: newWishlist }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log('That worked!')
  }

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }


  async function handleDelete() {
    await axios.delete(`/api/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/activities')
  }

  return <div className="main">

    {/*
    // * HERO SECTION
    */}

    <section className="hero is-medium is-link restaurant-hero"
      style={{
        backgroundImage: `url(${restaurant.image})`,
        backgroundSize: 'cover'
      }}>
      <div className="hero-body restaurant-hero">
        <p className="title is-1 restaurant-hero-text">
          {restaurant.name}
        </p>
      </div>
    </section>

    <div className="container">

      {/*
    // * LEVEL SECTION
    */}

      <div className="level mt-2">
        <div className="level-left">
          <div className="level-item">
            <div className="tags has-addons">
              <span className="tag is-light" style={{
                fontSize: '20px'
              }}>🙋‍♀️</span>
              <span className="tag is-light is-warning" style={{
                fontSize: '20px'
              }}>1</span>
            </div>
          </div>
          <div className="level-item">
            <div className="tags has-addons">
              <span className="tag is-light" style={{
                fontSize: '20px'
              }}>⭐️</span>
              <span className="tag is-light is-warning" style={{
                fontSize: '20px'
              }}>1</span>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {(isCreator(restaurant.creator._id) || user.admin)
              && <button
                className="button is-danger"
                onClick={handleDelete}
              >Delete {restaurant.name}</button>}
          </div>
          <div className="level-item">
            {(isCreator(restaurant.creator._id) || user.admin)
              && <Link
                to={`/activities/update-restaurant/${restaurant._id}`}
                className="button is-danger"
              >Update {restaurant.name}</Link>}
          </div>
        </div>
      </div>

      {/*
    // * BODY SECTION
    */}


      <div className="columns">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2 className="title is-3">{restaurant.name}</h2>
                {restaurant.address1 && <p className="subtitle is-5 has-text-warning mb-1">{restaurant.address1}</p>}
                {restaurant.address2 && <p className="subtitle is-5 has-text-warning">{restaurant.address2}</p>}
                {restaurant.zipcode && <p className="subtitle is-5 has-text-warning mt-1">{restaurant.zipcode}</p>}
                <h2 className="title mt-2">{restaurant.price}</h2>
                <div className="card-buttons">{restaurant.category.map((cat, index) => {
                  return <div className="button is-warning is-light mr-2" key={index}>{cat}</div>
                })}</div>
                <div className="subtitle is-5 mt-4"><a href={restaurant.link} target="_blank" rel="noreferrer">Find out more!</a></div>
              </div>
            </div>
            <footer className="card-footer">
              <div className="card-footer-item">
                <a className="is-link is-size-5" onClick={handleAddToWishlist}>🧞‍♀️ Add to Wishlist</a>
              </div>
              <div className="card-footer-item">
                <a className="is-link is-size-5">⭐️ Upvote</a>
              </div>
            </footer>
          </div>
        </div>
        <div className="column is-two-thirds">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className='map-container'>
                  <MapGL
                    {...mapConfig}
                    onViewportChange={(mapConfig) => setMapConfig(mapConfig)}
                    mapboxApiAccessToken={'pk.eyJ1Ijoia2toZXJiIiwiYSI6ImNrbDVjanIycDI2M24yb21zbGYzMGpnM3QifQ.VwrolxjnRnyw3T9JdycZfw'}
                  >
                    <Marker
                      latitude={restaurant.lat}
                      longitude={restaurant.long}
                    >
                      <h5 className="map-label">{restaurant.name}</h5>

                    </Marker>
                  </MapGL>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/*
    // * MEET-UP SECTION
    */}

    <section className="hero is-warning my-4">
      <div className="hero-body">
        <div className="container">
          <h2 className="title">Come see us! </h2>
          <h2 className="subtitle">Loose End meet-ups taking place at {restaurant.name}</h2>
          <div className="scrolling-wrapper">
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
            <div className="scrolling-card-small">Future event</div>
          </div>
        </div>
      </div>
    </section>

    <div className="container">

      {/*
    // * COMMENTS SECTION
    */}

      <section className="section">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h2 className="title is-3">Reviews</h2>
              <p className="subtitle is-5">Been to {restaurant.name}? Tell us what you think!</p>
            </div>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="Make a comment.."
                  >
                  </textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    className="button is-warning"
                  >
                    Submit
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
}