import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RingLoader from 'react-spinners/RingLoader'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth.js'

const Profile = ({ match, history }) => {

  const profileId = match.params.profileId

  const [profile, updateProfile] = useState([])
  const [loading, updateLoading] = useState(true)
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')

  async function fetchData() {
    const { data } = await axios.get(`/api/user/${profileId}`)
    updateProfile(data)
    updateLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  async function handleDelete() {
    await axios.delete(`/api/user/${profileId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/')
    localStorage.removeItem('token')
  }

  function handleComment() {
    axios.post(`/api/user/${profileId}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        updateProfile(resp.data)
        fetchData()
      })
  }

  function handleDeleteComment(commentId) {
    axios.delete(`/api/user/${profileId}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateProfile(resp.data)
        fetchData()
      })
  }

  const imageStyle = {
    width: '170px',
    height: '128px',
    borderRadius: '5px'
  }

  const cardStyle = {
    height: '230px'
  }

  return <div className="m-4">
    <div className="title is-size-1 m-6">
      <h1>{`${profile.firstName}'s profile`}</h1>
    </div>
    <div className="columns has-text-centered">
      <div className="column is-one-third p-0 mt-3 mb-3 ml-3">
        <div>
          <div className="card" >
            <div className="card-image">
              <figure className="image is-3by3">
                <img src={profile.image} alt="Profile photo" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <h2 className="title is-4">{profile.firstName}</h2>
                  <h3 className="subtitle is-4">{profile.lastName}</h3>
                </div>
              </div>

              <div className="content">
                <h4>Age: {profile.age}</h4>
                <h4>Location: {profile.homeTown}</h4>
                <h4>Interests: {profile.interests.map((interest, index) => {
                  const item = interest[0].toUpperCase() + interest.slice(1)
                  if (index === profile.interests.length - 1) {
                    return item
                  } else {
                    return item + ', '
                  }
                })}</h4>
              </div>
            </div>
          </div>
          <div className="card mt-3" >
            <div className="card-content has-text-centered">
              {isCreator(profileId) && <Link
                to={`/updateProfile/:${profileId}`}
                className="button is-warning mr-1"
              >Update profile</Link>}
              {isCreator(profileId) && <button
                className="button is-danger ml-2"
                onClick={handleDelete}
              >Delete profile</button>}
            </div>
          </div>
        </div>
      </div>
      <div className="column is-two-thirds p-0 mt-3 mb-3 ml-2">
        <div className="card mb-2">
          <h2 className="subtitle mt-3 pt-2">Restaurants Wishlist</h2>
          <div className="columns m-2">
            {profile.restaurantWishlist.map((restaurant) => {
              return <Link key={restaurant._id} to={`/activities/${restaurant._id}`}>
                <div className="card m-2 column" style={cardStyle}>
                  <img src={restaurant.image} style={imageStyle} />
                  <h4>{restaurant.name}</h4>
                  <h6>{ }</h6>
                </div>
              </Link>
            })}
          </div>
        </div>
        <div className="card">
          <h2 className="subtitle mt-3 pt-2">Points of Interest Wishlist</h2>
          <div className="columns m-2">
            {profile.poiWishlist.map((poi) => {
              return <Link key={poi._id} to={`/poi/${poi._id}`}>
                <div className="card m-2 column" style={cardStyle}>
                  <img src={poi.image} style={imageStyle} />
                  <h4>{poi.name}</h4>
                  <h6>{ }</h6>
                </div>
              </Link>
            })}
          </div>
        </div>
        <div className="card mt-2 mb-2">
          <h2 className="subtitle mt-3 pt-2">Attended Events</h2>
          <div className="columns m-2">

          </div>
        </div>
      </div>
    </div>
    {
      // ! Create comments
    }
    {profile.userReviews && profile.userReviews.map(comment => {
      return <article key={comment._id} className="media">
        <div className="media-content">
          <div className="content">
            <p>
              {comment.text}
            </p>
            <p className="subtitle is-size-7">{comment.user.firstName}</p>
          </div>
        </div>
        {
          // ! Only the person who created a comment should be able to delete a comment
        }
        {isCreator(comment.user._id) && <div className="media-right">
          <button
            className="delete"
            onClick={() => handleDeleteComment(comment._id)}>
          </button>
        </div>}
      </article>
    })}
    <div className="card">
      <div className="m-3">
        <h2 className="subtitle">User Reviews</h2>
        <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Make a comment.."
                  onChange={event => setText(event.target.value)}
                  value={text}
                >
                  {text}
                </textarea>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  onClick={handleComment}
                  className="button is-warning"
                >
                  Submit
                </button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
}

export default Profile