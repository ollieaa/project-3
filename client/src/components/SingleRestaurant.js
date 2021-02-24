import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth'

export default function SingleRestaurant({ match, history }) {
  const restaurantId = match.params.restaurantId
  const [restaurant, updateRestaurant] = useState([])
  const [user, updateUser] = useState('')
  const [loading, updateLoading] = useState(true)
  //const [commentText, setCommentText] = useState('')
  const token = localStorage.getItem('token')


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

  return <div className="container">

    <article>
      <h1 className="title">{restaurant.name}</h1>
      <div className="button is-success"><Link to={'/activities/food-and-drink'}>Head back</Link></div>
      <figure className='image'>
        <img src={restaurant.image} alt={restaurant.name} />
      </figure>
    </article>

    <article>
      <h2 className="subtitle">{`Upvotes: ${restaurant.upVotes}`}</h2>
      <h2 className="subtitle">{`Price: ${restaurant.price}`}</h2>
      <h2 className="subtitle">{`Address: ${restaurant.address}`}</h2>
      <h2 className="subtitle">{`City: ${restaurant.location}`}</h2>
      <h2 className="subtitle">{`Phone: ${restaurant.phone}`}</h2>
      <a href={restaurant.link} target="_blank" rel="noreferrer">Find out more at Yelp!</a>
    </article>

    <article>
      <button className="button is-danger">Create Event at {restaurant.name}</button>
      <button className="button is-success" onClick={handleAddToWishlist}>Add {restaurant.name} to your wishlist</button>
      <button className="button is-danger">Upvote</button>
    </article>

    <article>
      <div><h2 className="title">Map section</h2></div>
      <div><img src="https://www.kvc.org/wp-content/uploads/2014/09/dcmap-narrow-1038x475.png" alt="map" /></div>
    </article>

    <article>
      <div><h2 className="title">Up-coming events section</h2></div>
      <h2 className="subtitle">All future events are listed here</h2>
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
    </article>

    <article>
      <div><h2 className="title">Previous events section</h2></div>
      <h2 className="subtitle">All previous events are listed here</h2>
      <div className="scrolling-wrapper">
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
        <div className="scrolling-card-small">Previous event</div>
      </div>
    </article>

    <article>
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
    </article>

    <article>
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
    </article>
  </div>
}