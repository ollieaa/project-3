import React from 'react'

const inputFields = ['name', 'description']

export default function GroupForm({ formData, handleSubmit, handleChange }) {


  return <div className="section">
    <div className="container">

      <form className="form">

        <div className="field">
          <label className="label">Group Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.name}
              onChange={handleChange}
              name="name" />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              value={formData.description}
              onChange={handleChange}
              name="description" />
          </div>
        </div>

        <button className="button mt-5 is-warning" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  </div>
}