import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import RestaurantForm from './RestaurantForm'

export default function UpdateRestaurant({ history, match }) {

  const restaurantId = match.params.restaurantId

  const [formData, updateFormData] = useState({
    name: '',
    link: '',
    image: '',
    lat: '',
    long: '',
    location: '',
    address: '',
    phone: '',
    category: [],
    price: []
  })

  useEffect(() => {
    axios.get(`/api/restaurants/${restaurantId}`)
      .then(({ data }) => {
        console.log(data.price)
        const mappedFormData = {
          ...data,
          category: data.category.map(cat => {
            return { value: cat, label: cat[0].toUpperCase() + cat.slice(1) }
          }),
          price: data.price
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
      ...formData,
      category: formData.category.map(cat => cat.value),
      price: formData.price.value
    }
    try {
      const { data } = await axios.put(`/api/restaurants/${restaurantId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/activities/${data._id}`)
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
          Have we got something wrong?
        </p>
        <p className="subtitle">
          Update it!
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
            <div className="button is-warning is-light"><Link to={'/activities/food-and-drink'}>Back to food and drink</Link></div>
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