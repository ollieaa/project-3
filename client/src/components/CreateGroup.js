import React, { useState } from 'react'
import axios from 'axios'
var generator = require('generate-password')
import { Link } from 'react-router-dom'

import GroupForm from './GroupForm'
import ImageUpload from './ImageUpload.js'

export default function CreateGroup({ history }) {
  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    image: '',
    passcode: ''
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const newFormData = {
      ...formData,
      passcode: generator.generate({
        length: 10,
        numbers: true
      })
    }
    console.log(formData.passcode)
    try {
      const { data } = await axios.post('/api/groups', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/groups/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }



  return <div>

    {/*
    // * TITLE SECTION
    */}

    <section className="hero is-small is-warning">
      <div className="hero-body">
        <p className="title has-text-centered">
          Create a new group
        </p>
        <p className="subtitle has-text-centered">
          Explore new places, together!
        </p>
      </div>
    </section>

    {/*
    // * LEVEL SECTION
    */}

    <div className="container mb-4">

      <div className="level mt-2">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <div className="button is-warning"><Link to={'/groups'}>Back to groups</Link></div>
          </div>
        </div>
      </div>



      {/*
    // * FORM SECTION
    */}


      <div className="columns">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2 className="title">Add a picture</h2>
                <ImageUpload
                  formData={formData}
                  updateFormData={updateFormData}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2 className="title">Group details</h2>
                <GroupForm
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  formData={formData}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
}