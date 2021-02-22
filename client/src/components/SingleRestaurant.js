import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function SingleRestaurant({ match }) {
  const restaurantId = match.params.restaurantId
  const [restaurant, updateRestaurant] = useState([])
  //const [commentText, setCommentText] = useState('')
  // const token = localStorage.getItem('token')


  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const { data } = await axios.get(`/api/restaurants/${restaurantId}`)
        updateRestaurant(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRestaurant()
  }, [])

  // async function handleDelete() {
  //   await axios.delete(`/api/restaurants/${restaurantId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   history.push('/activities')
  // }

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
      <button className="button is-danger">Add {restaurant.name} to your wishlist</button>
      <button className="button is-danger">Upvote</button>
    </article>

    <article>
      <div><h2 className="title">Map section</h2></div>
      <div><img src="https://www.kvc.org/wp-content/uploads/2014/09/dcmap-narrow-1038x475.png" alt="map" /></div>
    </article>

    <article>
      <div><h2 className="title">Up-coming events section</h2></div>
      <h2 className="subtitle">All future events are listed here</h2>
      <div className="card">Future event</div>
      <div className="card">Future event</div>
      <div className="card">Future event</div>
      <div className="card">Future event</div>
    </article>

    <article>
      <div><h2 className="title">Previous events section</h2></div>
      <h2 className="subtitle">All previous events are listed here</h2>
      <div className="card">Previous event</div>
      <div className="card">Previous event</div>
      <div className="card">Previous event</div>
      <div className="card">Previous event</div>
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


    {
      // ! Remove below link when proper authorization complete - TESTING ONLY
    }

    <div className="button is-warning"><Link to={`/activities/update-restaurant/${restaurant._id}`}>Edit restaurant</Link></div>

    <article>
      {/* {isCreator(restaurant.creator._id) && <button
        className="button is-danger"
        onClick={handleDelete}
      >Delete Restaurant</button>}
      {isCreator(restaurant.creator._id) && <Link
        to={`/activities/update-restaurant/${restaurant._id}`}
        className="button is-secondary"
      >Update Restaurant</Link>} */}
    </article>
  </div>
}