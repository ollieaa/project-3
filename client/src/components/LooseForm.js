import React from 'react'

import interestTypes from '../data/interestTypes.js'
import Select from 'react-select'

const inputFields = ['firstName', 'lastName', 'email', 'password', 'image', 'age', 'homeTown']

function LooseForm({ formData, handleSubmit, handleChange, handleTypeChange }) {
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
          {'Interests'}
        </label>
        <Select
          defaultValue={[]}
          isMulti
          name="colors"
          options={interestTypes}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleTypeChange}
          value={formData.interests}
        />
        <button className="button mt-5 is-warning">Submit</button>
      </form>
    </div>
  </div>
}

export default LooseForm