// NOTES
// --can't log in yet -- double check this works
// --make decision re: category being boolean (will need to be a drop down)

import React, { useState } from 'react'
import axios from 'axios'

export default function Create({ history }) {

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
    FunFact: '',
    image: '',
    link: ''
  })

  const inputFields = ['category', 'name', 'tube', 'description', 'types', 'address', 'price', 'time', 'phone', 'funfact', 'image', 'link']

  // ? This is called whenever an input changes
  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  function handleTypesChange(event) {
    const { value } = event.target
    updateFormData({ ...formData, types: [value] })
  }

  // ? This gets called when we submit the form
  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/poi', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/poi/${data._id}`)
    } catch (err) {
      // ! Handle the error in here!
      console.log(err.response.data)
    }
  }

  return <div className="section">
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">
          Did we miss something?
        </p>
        <p className="subtitle">
          Add it below!
        </p>
      </div>
    </section>
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
        <p className="label">Type:</p>

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

// const CreateActivity = () => {
//   return <h1>Create Activity</h1>
// }

// export default CreateActivity