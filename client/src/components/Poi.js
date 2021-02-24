// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'
import poiTypes from '../data/poiTypes'
import RingLoader from 'react-spinners/RingLoader'




const Poi = () => {
  // return <h1>Activities</h1>

  const [poiData, updatePoi] = useState([])
  const [type, updateType] = useState('All')
  const [search, updateSearch] = useState('')
  const _ = require('lodash')
  const [loading, updateLoading] = useState(true)


  console.log(poiData, 'heyyyyyyy')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/poi/')
      updatePoi(data)
      const shuffledPoi = _.shuffle(data)
      updatePoi(shuffledPoi)
      updateLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

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
          Browse below, filter by type, search by keyword or create your own!
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

      <div className="button is-success"><Link to='/createPoi'>Add somewhere new!</Link></div>

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