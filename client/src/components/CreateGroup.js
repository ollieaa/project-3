import React, { useState } from 'react'
import axios from 'axios'

import GroupForm from './GroupForm'

export default function CreateGroup({ history }) {

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    image: '',
    groupPassword: ''
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData
    }

    try {
      const { data } = await axios.post('/api/groups', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/groups/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <div className="container">
    <h1 className="title">Add a new group</h1>
    <GroupForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  </div>
}