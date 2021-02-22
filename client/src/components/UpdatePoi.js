import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Update({ history, match }) {

  const poiId = match.params.poiId

  const [formData, updateFormData] = useState({
    category: '',
    name: '',
    tube: '',
    description: '',
    types: [],
    address: '',
    price: '',
    time: '',
    phone: '',
    funfact: '',
    image: '',
    link: ''
  })

  const inputFields = ['category', 'name', 'tube', 'description', 'types', 'address', 'price', 'time', 'phone', 'funfact', 'image', 'link']

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
      console.log(data._id)
      history.push(`/activities/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        {inputFields.map(field => {
          return <div key={field} className="field">
            <label className="label">
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={formData[field]}
                onChange={handleChange}
                name={field}
              />
            </div>
          </div>
        })}
        <select name="types" onChange={handleTypesChange}>
          <option value="gallery">Gallery</option>
          <option value="gardens">Gardens</option>
          <option value="historic">Historic Site</option>
          <option value="landmark">Landmark</option>
          <option value="market">Market</option>
          <option value="Monument">Monument</option>
          <option value="museum">Museum</option>
          <option value="Palace">Palace</option>
          <option value="park">Park</option>
          <option value="Planetarium">Planetarium</option>
          <option value="art">Public Art</option>
          <option value="religious">Religious Building</option>
          <option value="square">Square</option>
          <option value="statue">Statue</option>
          <option value="Other">Other</option>


        </select>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}


// import React from 'react'

// const UpdateActivity = () => {
//   return <h1>Update Activity</h1>
// }

// export default UpdateActivity