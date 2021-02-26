// BARS
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// ? import components from my library
import MapGL, { Marker } from 'react-map-gl'
import RingLoader from 'react-spinners/RingLoader'


const Geography2 = () => {
  const [bars, updateBars] = useState([])
  const [loading, updateLoading] = useState(true)


  const [viewPort, updateViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: 12,
    latitude: 51.5080,
    longitude: -0.1281
  })

  useEffect(() => {

    axios.get('/api/restaurants')
      .then(resp => {
        const filteredBars = resp.data.filter(bar => {
          console.log(bar.lat, 'wooooooooo')
          // return poi.latlng && poi.latlng.length === 2
          return bar.lat && bar.long
        })
        // ? Get data out of response, set in state.
        updateBars(filteredBars)
        updateLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  console.log(bars, 'weeeeeeeeeeee')
  return <MapGL
    {...viewPort}
    onViewportChange={(viewPort) => updateViewPort(viewPort)}
    mapboxApiAccessToken={'pk.eyJ1Ijoia2toZXJiIiwiYSI6ImNrbDVjanIycDI2M24yb21zbGYzMGpnM3QifQ.VwrolxjnRnyw3T9JdycZfw'}>
    {bars.map((bar, i) => {
      return <Marker
        key={i}
        latitude={bar.lat}
        longitude={bar.long}
      >
        {/* <img width={20} key={i} src={bar.image} /> */}
        <p className="map-label">{bar.name}</p>
      </Marker>
    }

    )}
  </MapGL>
}

export default Geography2




// import React from 'react'

// const Map = () => {
//   return <h1>testest</h1>

// }

// export default Map