import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MeetUpForm from './MeetUpForm.js'
import {getLoggedInUserId} from '../lib/auth.js'
import { CreateSuggestion } from './Suggestion.js'

export default function UpdateMeetUp({history, match}) {

  const meetUpId = match.params.meetUpId
  const [loggedInUser, updateLoggedInUser] = useState([])
  const [loading, updateLoading] = useState(true)
  const [formData, updateFormData] = useState({
    name: '',
    location: '',
    date: '',
    time: '',
    description: '',
    tags: [],
    image: '',
    restaurantSuggestions: [],
    poiSuggestions: [],
    isActive: true,
  })

  useEffect(() => {
    axios.get(`/api/singleMeetUp/update/${meetUpId}`)
      .then(({ data }) => {
        const mappedFormData = {
          ...data,
          tags: data.tags.map(tag => {
            return { value: tag, label: tag[0].toUpperCase() + tag.slice(1) }
          })
        }
        
        updateFormData(mappedFormData)
        updateLoading(false)
      })
  }, [])

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
      
    } else {
      updateFormData({...formData, [suggestionType]: suggestionType.push(id)})
      
    }
  }

  async function handleSubmit(event) {

    event.preventDefault()

    const token = localStorage.getItem('token')

    if (!formData.name || !formData.location || !formData.date || formData.time === "--:--" || !formData.time || !formData.description) {

      alert('Please complete all of the required fields.')

    } else {

      const newFormData = {
        ...formData,
        tags: formData.tags.map(tag => tag.value),
      }

      try {
        const { data } = await axios.put(`/api/singleMeetUp/${meetUpId}`, newFormData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        history.push(`/meetUp/${data._id}`)
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }
  getLoggedInUser()

  if (loading || !loggedInUser._id) {
    return <div>loading</div>
  }

  return <div id="updateMeetUpPage">
    <section className="hero is-info is-small">
      <div className="hero-body">
        <p className="title">
          Update Your MeetUp
        </p>
        <p className="subtitle">
          Use this form to make any changes to your MeetUp
        </p>
      </div>
    </section>

    <div id="updateMeetUpMain">
      <div id="updateMeetUpColumns">
        <div id="updateMeetUpLeft">
          <MeetUpForm
            handleChange={handleChange}
            handleTagChange={(tags) => updateFormData({ ...formData,  tags })}
            handleSubmit={handleSubmit}
            formData={formData}
            button="Update MeetUp" 
          /> 
        </div>

        <div id="updateMeetUpRight">
          <div id="updateSuggestionsBox">
            <h2>Suggest Activities from your WishList</h2>
            <div className="card" id="updateSuggestions">           
                  {loggedInUser.restaurantWishlist.map((item) => {

                    return <CreateSuggestion item={item} 
                                             handleSelect={handleSelect}
                                             formData={formData}
                                             key={item._id}
                                             suggestionType={formData.restaurantSuggestions} 
                      />
                  })}
                  {loggedInUser.poiWishlist.map((item) => {

                    return <CreateSuggestion item={item} 
                                             handleSelect={handleSelect}
                                             formData={formData}
                                             key={item._id}
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

