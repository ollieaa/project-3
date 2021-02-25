import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'

function RandomRestaurant() {
  const [event, updateEvent] = useState([])
  const [loading, updateLoading] = useState(true)

  function random() {
    return Math.floor(Math.random() * event.length)
  }
  const num1 = random()

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/restaurants')
      updateEvent(data)
      updateLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  const cardStyle = {
    height: '380px'
  }

  return <Link to={`/activities/${event[num1]._id}`}>
    <div className="card" style={cardStyle}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={event[num1].image} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{event[num1].name}</p>
            <p className="subtitle is-6">{event[num1].location}</p>
          </div>
        </div>
      </div>
    </div>
  </Link >
}

export default RandomRestaurant