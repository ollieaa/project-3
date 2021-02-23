// FILTER/SEARCH BAR DON'T WORK


// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'
// import SinglePoi from './components/SinglePoi.js'
import poiTypes from '../data/poiTypes'



const Poi = () => {
  // return <h1>Activities</h1>

  const [poiData, updatePoi] = useState([])
  const [type, updateType] = useState('All')
  const [search, updateSearch] = useState('')
  const _ = require('lodash')

  console.log(poiData, 'heyyyyyyy')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/poi/')
      updatePoi(data)
      const shuffledPoi = _.shuffle(data)
      updatePoi(shuffledPoi)
    }
    fetchData()
  }, [])

  function filterPoi() {
    return poiData.filter(poi => {
      return (type === 'All' || (poi.types.includes(type)))
        && poi.name.toLowerCase().includes(search.toLowerCase())
    })
  }

  return <div>
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">
          Points of interest
        </p>
        <p className="subtitle">
          Browse below, filter by type or search by keyword!
        </p>
      </div>
    </section>


    <div className="filter-container">

      <select onChange={(event) => updateType(event.target.value)} >
        <option>All</option>
        {poiTypes.map((poi, i) => {
          return <option value={poi.value} key={i}>{poi.label}</option>
        })}
      </select>

      <input onChange={(event) => updateSearch(event.target.value)} placeholder="Search..." />
    
    </div>

    <div className="card">

      <div className="card">
        {filterPoi().map((poi, index) => {
          return <div key={index}>
            <Link to={`/poi/${poi._id}`}>
              <header className="card-header">
                <p className="card-header-title is-centered">{poi.name}</p>
              </header>

              <div className="card-content">
                <img className="card-image" src={poi.image} alt={poi.name} />
                <p className="card-content">{poi.description}</p>
                <p>{'Nearest Tube station: ' + poi.tube}</p>
              </div>

            </Link>
          </div>
        })}
      </div>

    </div>

  </div>
}

export default Poi