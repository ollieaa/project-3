import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import RestaurantForm from './RestaurantForm'
import ImageUpload from './ImageUpload.js'

export default function CreateRestaurant({ history }) {

  const [formData, updateFormData] = useState({
    name: '',
    link: '',
    image: '',
    lat: '',
    long: '',
    city: '',
    address1: '',
    address2: '',
    zipcode: '',
    phone: '',
    category: [],
    price: []
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const newFormData = {
      ...formData,
      category: formData.category.map(cat => cat.value),
      price: formData.price.value,
      lat: 0,
      long: 0
    }
    try {
      const { data } = await axios.post('/api/restaurants', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/activities/${data._id}`)
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
          Know a great place?
        </p>
        <p className="subtitle has-text-centered">
          What are you waiting for? Add it!
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
            <div className="button is-success"><Link to={'/activities/food-and-drink'}>Back to food and drink</Link></div>
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
                <h2 className="title">Venue details</h2>
                <RestaurantForm
                  handleChange={handleChange}
                  handleCategoryChange={(category) => updateFormData({ ...formData, category })}
                  handlePriceChange={(price) => updateFormData({ ...formData, price })}
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