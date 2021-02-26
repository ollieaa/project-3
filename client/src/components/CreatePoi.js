import React, { useState } from 'react'
import axios from 'axios'

import PoiForm from '././PoiForm.js'
import ImageUpload from './ImageUpload.js'


function CreatePoi({ history }) {

  const [formData, updateFormData] = useState({
    name: '',
    tube: '',
    description: '',
    address: '',
    price: '',
    time: '',
    phone: '',
    FunFact: '',
    link: ''
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData,
      types: formData.types.map(type => type.value)
    }

    try {
      const { data } = await axios.post('/api/poi', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push('/poi')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <div className="container">

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

    <ImageUpload
      formData={formData}
      updateFormData={updateFormData}
    />
    <PoiForm
      handleChange={handleChange}
      handleTypeChange={(types) => updateFormData({ ...formData, types })}
      handleSubmit={handleSubmit}
      formData={formData}
    />

  </div>



}

export default CreatePoi

