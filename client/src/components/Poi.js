// FILTER/SEARCH BAR DON'T WORK


// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'
// import SinglePoi from './components/SinglePoi.js'



const Activities = () => {
  // return <h1>Activities</h1>

  const [poiData, updatePoi] = useState([])
  const [type, updateType] = useState('All')
  const [search, updateSearch] = useState('')
  const _ = require('lodash')


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
      return (type === 'All' || (poi.types === type))
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
        <option value="all">All</option>
        <option value="gallery">Gallery</option>
        <option value="gardens">Gardens</option>
        <option value="historic">Historic Site</option>
        <option value="landmark">Landmark</option>
        <option value="market">Market</option>
        <option value="monument">Monument</option>
        <option value="museum">Museum</option>
        <option value="palace">Palace</option>
        <option value="park">Park</option>
        <option value="planetarium">Planetarium</option>
        <option value="art">Public Art</option>
        <option value="religious">Religious Building</option>
        <option value="square">Square</option>
        <option value="statue">Statue</option>
        <option value="Other">Other</option>
      </select>

      <input onChange={(event) => updateSearch(event.target.value)} placeholder="Search yourself!" />
    </div>



    <div className="card">

      <div className="card">
        {poiData.map((poi, index) => {
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

      {/* <div className="poi">
        {filterPoi().map((poi, i) =>
          <SinglePoi key={i} poi={poi} />)}
      </div> */}

    </div>

  </div>
}

export default Activities