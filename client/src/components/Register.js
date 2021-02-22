import React, { useState } from 'react'
import axios from 'axios'

import LooseForm from '././LooseForm.js'

function Register({ history }) {

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

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const newFormData = {
      ...formData,
      types: formData.interests.map(type => type.value)
    }

    try {
      const { data } = await axios.post('/api/register', newFormData, )
      console.log(data._id)
      history.push('/login')
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

export default Register