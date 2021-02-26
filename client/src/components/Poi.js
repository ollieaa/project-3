// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bulma'
import poiTypes from '../data/poiTypes'
import RingLoader from 'react-spinners/RingLoader'




const Poi = () => {
  const [poiData, updatePoi] = useState([])
  const [type, updateType] = useState('All')
  const [search, updateSearch] = useState('')
  const _ = require('lodash')
  const [loading, updateLoading] = useState(true)




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
    <section className="hero is-warning">
      <div className="hero-body">
        <p className="title">
          Points of interest
        </p>
        <p className="subtitle">
          Browse below, filter by type, search by keyword or create your own!
        </p>
      </div>
    </section>


    <div className="container">


      <div className="select is-success">
        <select onChange={(event) => updateType(event.target.value)} >
          <option>All</option>
          {poiTypes.map((poi, i) => {
            return <option value={poi.value} key={i}>{poi.label}</option>
          })}
        </select>
      </div>

      

      <input onChange={(event) => updateSearch(event.target.value)} placeholder="Search..." />
      <div className="button is-success"><Link to='/createPoi'>Add somewhere new!</Link></div>

    </div>



    <section className="section">

      <div className="column">
        {filterPoi().map((poi, index) => {
          return <div key={index} className="column">
            <Link to={`/poi/${poi._id}`}>
              <div className="card horizontal-card">
                <div className="horizontal-card-image" style={{
                  backgroundImage: `url(${poi.image})`,
                  backgroundSize: 'cover'
                }}>
                </div>
                <div className="horizontal-card-content ml-4 my-2">
                  <div className="media">
                    <div className="media-content">
                      <div className="horizontal-card-title">{poi.name}</div>
                      <div className="horizontal-card-buttons">
                        {poi.types.map((type, index) => {
                          return <div className="button is-success is-light mr-2" key={index}>{type}</div>
                        })}
                      </div>
                      <div className="horizontal-card-text is-size-7">{poi.description} </div>
                      <div className="horizontal-card-content-bottom is-size-7">{'Nearest tube station: ' + poi.tube} </div>


                    </div>
                  </div>
                </div>

              </div>
            </Link>


          </div>
        })}
      </div>

    </section>

  </div>
}

export default Poi