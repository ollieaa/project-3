import React, {useState} from 'react'
import axios from 'axios'
import MeetUpForm from './MeetUpForm.js'
import {getLoggedInUserId} from '../lib/auth.js'
import { CreateSuggestion } from './Suggestion.js'

export default function CreateMeetUp({history}) {

  

  const [loggedInUser, updateLoggedInUser] = useState([])
  const [formData, updateFormData] = useState({
    name: '',
    location: '',
    date: new Date().toISOString().substr(0, 10),
    time: '',
    description: '',
    tags: [],
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/14/b7/0e/51/relaxed-and-enjoyable.jpg',
    restaurantSuggestions: [],
    poiSuggestions: [],
    isActive: true,
  })

  async function getLoggedInUser() {
    const userId = getLoggedInUserId()
    const {data} = await axios.get(`/api/user/${userId}`)
    updateLoggedInUser(data)
  }

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleSelect(id, suggestionType) {

    if (suggestionType.includes(id)) {
      const itemToRemove = suggestionType.findIndex(item => item === id)
      updateFormData({...formData, [suggestionType]: suggestionType.splice(itemToRemove, 1)})
      console.log(suggestionType)
    } else {
      updateFormData({...formData, [suggestionType]: suggestionType.push(id)})
      console.log(suggestionType)
    }
  }

  async function handleSubmit(event) {

    event.preventDefault()

    if (!formData.name || !formData.location || !formData.date || formData.time === "--:--" || !formData.time || !formData.description) {
      alert('Please complete all of the required fields.')
    } else {
      const token = localStorage.getItem('token')
      const newFormData = {
        ...formData,
        tags: formData.tags.map(tag => tag.value),
      }
      try {
        const { data } = await axios.post('/api/meetUps',   newFormData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        history.push(`/meetUp/${data._id}`)
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }
  getLoggedInUser()

  if (!loggedInUser._id) {
    return <div>loading</div>
  }

  return <div id="createMeetUpPage">
    <section className="hero is-info is-small">
      <div className="hero-body">
        <p className="title">
          Create a MeetUp
        </p>
        <p className="subtitle">
          Fill out this form with details about your MeetUp
        </p>
      </div>
    </section>

    <div id="createMeetUpMain">

      <div id="createMeetUpColumns">
        <div id="createMeetUpLeft">
          <MeetUpForm
            handleChange={handleChange}
            handleTagChange={(tags) => updateFormData({ ...formData, tags })}
            handleSubmit={handleSubmit}
            formData={formData}
            button="Create MeetUp" 
          /> 
        </div>

        <div id="createMeetUpRight">
          <div id="createSuggestionsBox">
            <h2>Suggest Activities from your WishList</h2>
            <div className="card" id="createSuggestions">           
                  {loggedInUser.restaurantWishlist.map((item, i) => {

                    return <CreateSuggestion item={item} 
                                             handleSelect={handleSelect}
                                             formData={formData}
                                             key={i}
                                             suggestionType={formData.restaurantSuggestions} 
                      />
                  })}
                  {loggedInUser.poiWishlist.map((item, i) => {

                    return <CreateSuggestion item={item} 
                                             handleSelect={handleSelect}
                                             formData={formData}
                                             key={i}
                                             suggestionType={formData.poiSuggestions} 
                    />
                  })}
            </div> 
          </div>                
        </div> 
      </div>
    </div>  
  </div>
}
