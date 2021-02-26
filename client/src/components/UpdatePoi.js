import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PoiForm from '././PoiForm.js'


export default function Update({ history, match }) {

  const poiId = match.params.poiId

  const [formData, updateFormData] = useState({
    category: '',
    name: '',
    tube: '',
    description: '',
    address: '',
    price: '',
    time: '',
    phone: '',
    funfact: '',
    image: '',
    link: ''
  })

  const inputFields = ['category', 'name', 'tube', 'description', 'address', 'price', 'time', 'phone', 'funfact', 'image', 'link']

  useEffect(() => {
    axios.get(`/api/poi/${poiId}`)
      .then(({ data }) => {
        // ? If you want to be explicit:
        // updateFormData({
        //   name: data.name,
        //   weight: data.weight,
        //   image: data.image,
        //   types: data.types
        // })
        updateFormData(data)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  function handleTypesChange(event) {
    const { value } = event.target
    updateFormData({ ...formData, types: [value] })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.put(`/api/poi/${poiId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      history.push(`/poi/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <div>
    <section className="hero is-info is-small">
      <div className="hero-body">
        <p className="title">
          Add your own Point of Interest!
        </p>
        <p className="subtitle">
          Stumble across something interesting during your time in London? Fill out the form below to share with your fellow travelers!
        </p>
      </div>
    </section>
    <PoiForm
      handleChange={handleChange}
      handleTypeChange={(types) => updateFormData({ ...formData, types })}
      handleSubmit={handleSubmit}
      onChange={handleChange}
      formData={formData}
    />
  </div>



}

