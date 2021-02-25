import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const MeetUpSearchForm = ({orientation, formData, updateFormData}) => {

  function handleChange(event) {
    const {name, value} = event.target
    updateFormData({...formData, [name]: value})
  }

  function handleSubmit(event) {
    event.preventDefault()
  }
 
  return <form onSubmit={handleSubmit}
               className={orientation}>              
    <input 
      className="input"
      type="text"
      value={formData.location}
      onChange={handleChange}
      name={"location"}
      placeholder="Location..."
    />
    <input 
      className="input"
      type="date"
      value={formData.date}
      onChange={handleChange}
      name={"date"}
    />
    <div className="select">       
      <select value={formData.category}
              onChange={handleChange}
              name="category">
        <option>All Categories</option>
        <option>Restaurants</option>
        <option>Culture</option>
        <option>Tours</option>
        <option>Walking</option>
      </select>
    </div>
    {!formData.location &&
    <button className="button is-warning" onClick={() => alert('Please enter a location.')}>Search</button>
    }
    {formData.location &&
    <Link to={{pathname: '/meetUp', state: {...formData, location: formData.location.toLowerCase(), category: formData.category.toLowerCase()}}}>
      <button className="button is-warning">Search</button>
    </Link>}  
  </form>  
}

export default MeetUpSearchForm