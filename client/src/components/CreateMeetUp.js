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
    image: '',
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
        console.log(newFormData)
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
    <h1>Create Meet Up</h1>

    <div id="createMeetUpSections">
      <div id="createMeetUpLeft">
        <MeetUpForm
          handleChange={handleChange}
          handleTagChange={(tags) => updateFormData({ ...formData, tags })}
          handleSubmit={handleSubmit}
          formData={formData}
          updateFormData={updateFormData}
          button="Create MeetUp" 
        /> 
      </div>
      <div id="createMeetUpRight">
        <div className="card" id="createSuggestions">
          <header className="card-header">
            <h2><strong>Suggest Activities from your WishList</strong></h2>
          </header>
          <div className="card-content">
            <div className="content" id="createSuggestionsArea">
              {loggedInUser.restaurantWishlist.map((item) => {

                return <a key={item._id} onClick={() => handleSelect(item._id, formData.restaurantSuggestions)}>
                  <CreateSuggestion item={item}/>
                </a>
              })}
              {loggedInUser.poiWishlist.map((item) => {

                return <a key={item._id} onClick={() => handleSelect(item._id, formData.poiSuggestions)}>
                  <CreateSuggestion item={item}/>
                </a>
              })}

            </div>
          </div>
        </div>        
      </div> 
    </div>
    
  </div>
}
