import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth'

export default function SingleRestaurant({ match, history }) {
  const restaurantId = match.params.restaurantId
  const [restaurant, updateRestaurant] = useState([])
  const [user, updateUser] = useState('')
  const [loading, updateLoading] = useState(true)
  const token = localStorage.getItem('token')
  const loggedIn = getLoggedInUserId()


  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const { data } = await axios.get(`/api/restaurants/${restaurantId}`)
        console.log(data.creator._id)
        updateRestaurant(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRestaurant()        
  }, [])

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
    return <h1>Loading</h1>
  }


  async function handleDelete() {
    await axios.delete(`/api/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/activities')
  }

  return <div>

    {/*
    // * HERO SECTION
    */}

    <section className="hero is-medium is-link restaurant-hero"
      style={{
        backgroundImage: `url(${restaurant.image})`,
        backgroundSize: 'cover'
      }}>
      <div className="hero-body restaurant-hero">
        <p className="title is-1">
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
              <span className="tag is-success" style={{
                fontSize: '20px'
              }}>🙋‍♀️</span>
              <span className="tag is-light" style={{
                fontSize: '20px'
              }}>1</span>
            </div>
          </div>
          <div className="level-item">
            <div className="tags has-addons">
              <span className="tag is-success" style={{
                fontSize: '20px'
              }}>⭐️</span>
              <span className="tag is-light" style={{
                fontSize: '20px'
              }}>1</span>
            </div>
          </div>
        </div>
        <div className="level-right">
          {loggedIn && <p className="level-item">
            <button className="button is-success">Create meet-up at {restaurant.name}</button></p>}
          {loggedIn && <p className="level-item">
            <button className="button is-success" onClick={handleAddToWishlist}>Add {restaurant.name} to your wishlist</button></p>}
        </div>
      </div>


      <div className="columns">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2 className="title is-1">{restaurant.name}</h2>
                <h2 className="subtitle is-3">{restaurant.address1}</h2>
                <h2 className="subtitle is-3">{restaurant.address2}</h2>
                <h2 className="subtitle is-3">{restaurant.zipcode}</h2>
                <h2 className="title">{restaurant.category}</h2>
                <h2 className="title">{restaurant.price}</h2>
                <a href={restaurant.link} target="_blank" rel="noreferrer">Find out more!</a>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">Add to Wishlist</a>
              <a href="#" className="card-footer-item">Upvote</a>
              <a href="#" className="card-footer-item">Create Meet-up</a>
            </footer>
          </div>
        </div>
        <div className="column is-two-thirds">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div><h2 className="title">Map section</h2></div>
                <img src="https://www.kvc.org/wp-content/uploads/2014/09/dcmap-narrow-1038x475.png" alt="map" />
              </div>
            </div>
          </div>
        </div>

      </div>

      <section className="hero is-medium is-success is-large">
        <div><h2 className="title">Come see us! </h2></div>
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
      </section>

      <section>
        <div><h2 className="title">Comments section</h2></div>
        <h2 className="subtitle">All comments on this restaurant are shown here</h2>
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
                className="button is-danger"
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </section>

      <section>
        {(isCreator(restaurant.creator._id) || user.admin)
          && <button
            className="button is-success"
            onClick={handleDelete}
          >Delete {restaurant.name}</button>}
        {(isCreator(restaurant.creator._id) || user.admin)
          && <Link
            to={`/activities/update-restaurant/${restaurant._id}`}
            className="button is-success"
          >Update {restaurant.name}</Link>}
      </section>
    </div>
  </div>
}