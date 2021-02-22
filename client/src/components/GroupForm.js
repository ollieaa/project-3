import React from 'react'

const inputFields = ['name', 'groupPassword', 'image', 'description', 'admins']

export default function GroupForm({ formData, handleSubmit, handleChange }) {
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

        <button className="button mt-5 is-danger">Submit</button>
      </form>
    </div>
  </div>
}