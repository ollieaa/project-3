import React, { useState } from 'react'
import axios from 'axios'

import RegisterForm from '././RegisterForm.js'
import ImageUploadRegister from './ImageUploadRegister.js'

function Register({ history }) {

  const logo = '././images/logo.png'

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
      interests: formData.interests.map(type => type.value)
    }

    try {
      const { data } = await axios.post('/api/register', newFormData,)
      console.log(data._id)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const logoStyle = {
    width: '250px'
  }

  const rightStyle = {
    marginTop: '35%'
  }

  const titleStyle = {
    color: '#FFB602'
  }

  return <div>
    <div className="columns has-text-centered">
      <div className="column is-half">
        <div>
          <h1 className="title has-text-centered is-size-1 mt-5">Join Our Family</h1>
        </div>
        <ImageUploadRegister
          formData={formData}
          updateFormData={updateFormData}
        />
        <RegisterForm
          handleChange={handleChange}
          handleTypeChange={(interests) => updateFormData({ ...formData, interests })}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </div>
      <div className="column is-half">
        <div className="column has-text-centered" style={rightStyle}>
          <h1 className="title is-size-1" style={titleStyle}>Loose End</h1>
          <img src={logo} style={logoStyle} className="mb-5"/>
          <p className="subtitle">Loose End is a platform for finding and building local communities. People use Loose End to meet new people, explore new places, find local hot spots, and pursue their passions, together.</p>
        </div>
      </div>
    </div>
  </div>
}

export default Register