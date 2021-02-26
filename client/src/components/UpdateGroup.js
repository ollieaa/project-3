import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import GroupForm from './GroupForm'

export default function UpdateGroup({ history, match }) {

  const groupId = match.params.groupId

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    image: '',
    passcode: ''
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

  return <div>

    {/*
    // * TITLE SECTION
    */}

    <section className="hero is-info">
      <div className="hero-body">
        <p className="title">
          Update group
        </p>
        <p className="subtitle">
          Make your changes here!
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
            <div className="button is-warning is-light"><Link to={'/groups'}>Back to groups</Link></div>
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