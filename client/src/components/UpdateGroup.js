import React, { useState, useEffect } from 'react'
import axios from 'axios'

import GroupForm from './GroupForm'

export default function UpdateGroup({ history, match }) {

  const groupId = match.params.groupId

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    image: '',
    groupPassword: ''
  })

  useEffect(() => {
    axios.get(`/api/groups/${groupId}`)
      .then(({ data }) => {
        const mappedFormData = {
          ...data
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
      ...formData
    }
    try {
      const { data } = await axios.put(`/api/groups/${groupId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/groups/${data._id}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  return <GroupForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}