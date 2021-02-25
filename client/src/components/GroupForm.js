import React from 'react'

const inputFields = ['name', 'description']

export default function GroupForm({ formData, handleSubmit, handleChange }) {


  return <div className="section">
    <div className="container">
      
      <form className="form">

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

        <button className="button mt-5 is-success" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  </div>
}