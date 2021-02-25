import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MeetUpForm from './MeetUpForm.js'

export default function UpdateMeetUp({history, match}) {

  const meetUpId = match.params.meetUpId
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
    axios.get(`/api/singleMeetUp/${meetUpId}`)
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

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
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

  if (loading) {
    return <div>loading</div>
  }

  return <div id="updateMeetUpPage">
    <h1>Update Meet Up</h1>

    <div id="updateMeetUpSections">
      <div id="updateMeetUpLeft">
        <MeetUpForm
          handleChange={handleChange}
          handleTagChange={(tags) => updateFormData({ ...formData, tags })}
          handleSubmit={handleSubmit}
          formData={formData}
          button="Update MeetUp" 
        /> 
      </div>
    </div>
  </div>
}

