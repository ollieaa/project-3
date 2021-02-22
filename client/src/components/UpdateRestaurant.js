import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
      price: formData.price.map(amount => amount.value)
    }
    try {
      const { data } = await axios.put(`/api/restaurants/${restaurantId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/restaurants/${data._id}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  return <RestaurantForm
    handleChange={handleChange}
    handleCategoryChange={(category) => updateFormData({ ...formData, category })}
    handlePriceChange={(price) => updateFormData({ ...formData, price })}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}