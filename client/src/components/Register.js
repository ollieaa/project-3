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
      interests: formData.interests.map(type => type.value)
    }

    try {
      console.log(newFormData)
      const { data } = await axios.post('/api/register', newFormData,)
      console.log(data._id)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const backgroundStyle = {
    backgroundColor: '#fafafa'
  }

  const logoStyle = {
    width: '300px'
  }

  return <div>
    <div className="columns has-text-centered">
      <div className="column is-half">
        <div>
          <h1 className="title has-text-centered mt-5">Join Our Family</h1>
        </div>
        <LooseForm
          handleChange={handleChange}
          handleTypeChange={(interests) => updateFormData({ ...formData, interests })}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </div>
      <div className="column is-half" style={backgroundStyle}>
        <div className="column has-text-centered">
          <h1 className="title is-align-items-center">Loose End</h1>
          <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" style={logoStyle} />
          <p>Loose End is a platform for finding and building local communities. People use Loose End to meet new people, explore new places, find local hot spots, and pursue their passions, together.</p>
        </div>
      </div>
    </div>
  </div>
}

export default Register