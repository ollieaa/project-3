import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import dateOnly from '../lib/getDate'

const MeetUp = ({location}) => {

  const search = location.state
  const [meetUps, updateMeetUps] = useState([])
  const [formData, updateFormData] = useState({
    location: "",
    date: new Date().toISOString().substr(0, 10),
    category: 'All Categories'
  })

  useEffect(() => {
    async function getMeetUps() {
      if (search.category === "all categories") {
        const {data} = await axios.get(`/api/meetUps/${search.location}/${search.date}`)
        updateMeetUps(data)
      } else {
        const {data} = await axios.get(`/api/meetUps/${search.location}/${search.date}/${search.category}`)
        updateMeetUps(data)
      }    
    }
    getMeetUps()
  }, [])

  function handleChange(event) {
    const {name, value} = event.target
    updateFormData({...formData, [name]: value})
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!formData.location) {
      alert("Please enter a location for your search.")
    } else {
      if (formData.category === "All Categories") {
        const {data} = await axios.get(`/api/meetUps/${formData.location}/${formData.date}`)
        updateMeetUps(data)
        updateFormData({location:'', date: new Date().toISOString().substr(0, 10), category: ''})
      } else {
        const {data} = await axios.get(`/api/meetUps/${formData.location}/${formData.date}/${formData.category.toLowerCase()}`)
        updateMeetUps(data)
        updateFormData({location:'', date: new Date().toISOString().substr(0, 10), category: ''})
      }
    }
  }
  if (!meetUps) {
    return null
  }

  return <div id="meetUpsPage">
    <h1>MeetUps</h1>
    <div id="meetUpsColumns">
      <div id="meetUpsLeft">
        <form id="meetUpSearch" onSubmit={handleSubmit}>
          <h2>Update your search:</h2>
          <input
          className="input" 
          type="text"
          value={formData.location}
          onChange={handleChange}
          name={"location"}
          placeholder="Location..."
          />
          <input 
            className="input"
            type="date"
            value={formData.date}
            onChange={handleChange}
            name={"date"}
          />
          <div className="select">
            <select value={formData.category}
                    onChange={handleChange}
                    name="category">
              <option>All Categories</option>
              <option>Restaurants</option>
              <option>Culture</option>
              <option>Tours</option>
              <option>Walking</option>
            </select>
          </div>
          <button className="button is-warning">Search</button>
        </form>
      </div>

      <div id="meetUpsRight">
        {meetUps.map((meetUp) => {
          return <Link key={meetUp._id} className="meetUpCard" to={`/meetUp/${meetUp._id}`}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={meetUp.creator.image} 
                       alt={meetUp.creator.firstName + ' ' + meetUp.creator.lastName}/>
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={meetUp.creator.image} 
                         alt={meetUp.creator.firstName + ' ' + meetUp.creator.lastName}/>
                  </figure>
                  </div>
                  <div className="media-content">
                    <h2>{meetUp.name}</h2>
                    <span>{meetUp.location}</span>
                    <span>{dateOnly(meetUp.date)}</span>
                  </div>
                </div>
                <div className="content">
                  {meetUp.tags.map((tag) => {
                    return <div key={tag} className="tag">
                      {tag}
                    </div>
                  })}
                  <p>{meetUp.restaurantSuggestions.length + meetUp.poiSuggestions.length} suggested activities..</p>
                </div>
              </div>
            </div>
          </Link>
        })}
      </div>
    </div>
  </div>
}

export default MeetUp