import React, { useState } from 'react'
import axios from 'axios'

import ImageUpload from './ImageUpload.js'

function Register({ history }) {

  const id = getLoggedInUserId()

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



  async function handleSubmit(event) {
    event.preventDefault()

    const newFormData = {
      ...formData,
      interests: formData.interests.map(type => type.value)
    }

    try {
      const { data } = await axios.put(`/api/user/${id}`, newFormData,)
      
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const logoStyle = {
    width: '250px'
  }

  const rightStyle = {
    marginTop: '15%',
    marginBottom: '5%'
  }

  const titleStyle = {
    color: '#FFB602'
  }

  return <div>
    <div className="columns has-text-centered">
      <div className="column is-half">
        <div>
          <h1 className="title has-text-centered is-size-1 mt-5">Upload Your Photo</h1>
        </div>
        <ImageUpload
          formData={formData}
          updateFormData={updateFormData}
          handleSubmit={handleSubmit}
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