// NO Map
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator, getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'

import Geography from '../components/Map.js'
import MapGL, { Marker } from 'react-map-gl'

export default function SinglePoiMap({ match, history }) {

  const poiId = match.params.poiId
  let map
  const [poi, updatePoi] = useState({})
  const [loading, updateLoading] = useState(true)
  const [loggedInUser, updateLoggedInUser] = useState({})

  const [mapConfig, setMapConfig] = useState({
    height: '45vh',
    width: '170vh',
    zoom: 14.5
  })


  useEffect(() => {
    async function fetchPoi() {
      try {
        const { data } = await axios.get(`/api/poi/${poiId}`)
        updatePoi(data)
        setMapConfig({ ...mapConfig, latitude: data.latlng[0], longitude: data.latlng[1] })
        updateLoading(false)
       
      } catch (err) {
        console.log(err)
      }
    }
    fetchPoi()
  }, [])


  if (mapConfig.latlng) {
    map = <div className='container'>
      <Geography config={mapConfig} />
    </div>
  }

  async function getLoggedInUser() {
    const userId = getLoggedInUserId()
    const { data } = await axios.get(`/api/user/${userId}`)
    updateLoggedInUser(data)
  }

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  async function handleWishlistAdd() {
    const token = localStorage.getItem('token')
    const userId = getLoggedInUserId()

    const newWishlist = loggedInUser.poiWishlist.concat(poiId)
    await axios.put(`/api/user/${userId}`, { poiWishlist: newWishlist }, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }


  async function handleDelete() {
    const token = localStorage.getItem('token')
    await axios.delete(`/api/poi/${poiId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/poi')
  }

  getLoggedInUser()

  if (!poi.user) {
    return null
  }

  // DISPLAY
  return <div>
    <section className="hero is-warning">
      <div className="hero-body">
        <p className="title">
          {poi.name}
        </p>
      </div>
    </section>

    <div className="columns is-vcentered">
      <div className="column has-text-centered is-centered">
        <div className="poi-buttons">
          {isCreator(poi.user._id) && <Link
            to={`/updatePoi/${poiId}`}
            className="button is-secondary"
          >Update Point of Interest</Link>}
          {isCreator(poi.user._id) && <button
            className="button is-danger"
            onClick={handleDelete}
          >Delete Point of Interest</button>}
          <button className="button is-secondary" onClick={handleWishlistAdd}>Add to your wishlist!</button>
          {/* {!loggedInUser.poiWishList.contains(poi._id) && <button className="button is-secondary" onClick={handleWishlistAdd}>Add to your wishlist!</button>} */}
        </div>


        <div className="card-content">

          <div className="content">
            <div className="control">
              <p className="subtitle">{poi.description}</p>
            </div>
          </div>

          <div className="content">
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <div className="control poi-image-holder">
                  <img className="image" src={poi.image} alt={poi.name} />
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>

          <div className="content">
            <div className="control">
              <p className="title">Fun Fact!</p>
              <p className="subtitle">{poi.funfact}</p>
            </div>
          </div>


          {map}


          <p className="subtitle">Practical Information:</p>

          <footer className="card-footer">

            <p className="card-footer-item">{'Address: ' + poi.address}</p>
            <p className="card-footer-item">{'Nearest Tube station: ' + poi.tube}</p>
            <p className="card-footer-item">{'Price: ' + poi.price}</p>
            <p className="card-footer-item">{'Opening times: ' + poi.time}</p>
            <p className="card-footer-item">{'Contact information: ' + poi.phone}</p>
            <p className="card-footer-item">
              <span>
                Check our their <a href={poi.link} target="_blank" rel="noreferrer">website</a>
              </span>
            </p>
          </footer>

          <div className='container is-half'>
            {/* <Geography config={mapConfig} /> */}
            <MapGL
              {...mapConfig}
              onViewportChange={(mapConfig) => setMapConfig(mapConfig)}
              mapboxApiAccessToken={'pk.eyJ1Ijoia2toZXJiIiwiYSI6ImNrbDVjanIycDI2M24yb21zbGYzMGpnM3QifQ.VwrolxjnRnyw3T9JdycZfw'}
            >
              <Marker
                latitude={poi.latlng[0]}
                longitude={poi.latlng[1]}
              >
                <h5 className="map-label">{poi.name}</h5>

              </Marker>
            </MapGL>
          </div>
        </div>







        <Link to={`/profile/${poi.user._id}`}><h2>{`Posted by: ${poi.user.firstName}`}</h2></Link>
      </div>
    </div>
  </div>
}