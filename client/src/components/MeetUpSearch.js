import React, {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import categories from '../data/categories.js'

const MeetUpSearch = () => {

  const [formData, updateFormData] = useState({
    location: "",
    date: new Date().toISOString().substr(0, 10),
    categories: []
  })

  function handleChange(event) {
    const {name, value} = event.target
    updateFormData({...formData, [name]: value})
  }


  return <div id="meetUpSearchPage">
    <h1>Search for MeetUps</h1>
    <form id="searchForm">
      <input 
        type="text"
        value={formData.location}
        onChange={handleChange}
        name={"location"}
        placeholder="Location..."
      />
      <input 
        type="date"
        value={formData.date}
        onChange={handleChange}
        name={"date"}
      />
      <Select
        id="meetUpCategories"
        defaultValue={categories[0]}
        isMulti
        name="categories"
        options={categories}
        className="basic-multi-select"
        classNamePrefix="select"
        value={formData.categories}
        onChange={(category) => updateFormData({...formData, categories: category})}
        />
    </form>
    <Link to={{pathname: '/meetUp', state: formData}}>
      <button>Search</button>
    </Link>
    
  </div>
}

export default MeetUpSearch