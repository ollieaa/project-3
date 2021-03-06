import React from 'react'

import poiTypes from '../data/poiTypes.js'
import Select from 'react-select'

const inputFields = ['name', 'tube', 'description', 'address', 'price', 'time', 'phone', 'funfact', 'link']

function PoiForm({ formData, handleSubmit, handleChange, handleTypeChange }) {
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
        <label className="label">
          Types: 
        </label>
        <Select
          defaultValue={[]}
          isMulti
          name="colors"
          options={poiTypes}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleTypeChange}
          value={formData.types}
        />
        <button className="button mt-5 is-success">Submit</button>
      </form>
    </div>
  </div>
}

export default PoiForm