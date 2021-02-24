import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'
import LooseForm from '././LooseForm.js'

function updateProfile({ history }) {

  const id = getLoggedInUserId()

  const [formData, updateFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: '',
    age: '',
    homeTown: '',
    interests: []
  })

  useEffect(() => {
    axios.get(`/api/user/${id}`)
      .then(({ data }) => {
        const mappedFormData = {
          ...data,
          interests: data.interests.map(interest => {
            return { value: interest, label: interest[0].toUpperCase() + interest.slice(1) }
          })
        }
        updateFormData(mappedFormData)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData,
      interests: formData.interests.map(interest => interest.value)
    }
    try {
      const { data } = await axios.put(`/api/user/${id}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/profile/:${id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return <LooseForm
    handleChange={handleChange}
    handleTypeChange={(interests) => updateFormData({ ...formData, interests })}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}

export default updateProfile