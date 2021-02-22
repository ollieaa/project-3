import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { isCreator } from '../lib/auth'

// export default function SingleActivity({ match, history }) {
export default function SingleActivity({ match }) {


  const poiId = match.params.poiId
  const [poi, updatePoi] = useState({})

  useEffect(() => {
    async function fetchPoi() {
      try {
        const { data } = await axios.get(`/api/poi/${poiId}`)
        updatePoi(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPoi()
  }, [])

  // async function handleDelete() {
  //   const token = localStorage.getItem('token')
  //   await axios.delete(`/api/poi/${poiId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   history.push('/poi')
  // }

  if (!poi.user) {
    return null
  }

  return <div className="individual-site-page">
    <div className="column">
      <header className="card-header">
        <p className="card-header-title is-centered">{poi.name}</p>
        <p className="card-content">{poi.types}</p>
      </header>

      <div className="card-content">
        <img className="card-image" src={poi.image} alt={poi.name} />
        <p className="card-content">{poi.description}</p>
        <p className="card-content">{'Fun Fact! ' + poi.funfact}</p>

        <p>Practical Information:</p>

        <footer className="card-footer">
          {/* <p className="card-content">{'Nearest Tube station: ' + poi.tube}</p>
          <p className="card-content">{'Price: ' + poi.price}</p>
          <p className="card-content">{'Opening times: ' + poi.time}</p>
          <p className="card-content">{'Contact information: ' + poi.phone}</p>
          <p className="card-content">{'Website: ' + poi.link}</p> */}
          <p className="card-footer-item">{'Nearest Tube station: ' + poi.tube}</p>
          <p className="card-footer-item">{'Price: ' + poi.price}</p>
          <p className="card-footer-item">{'Opening times: ' + poi.time}</p>
          <p className="card-footer-item">{'Contact information: ' + poi.phone}</p>
          <p className="card-footer-item">
            <span>
              Check our their website: <a href="#" target="_blank">{poi.link}</a>
            </span>
          </p>
        </footer>

      </div>



      {/* <h2>{`Posted by: ${poi.user.username}`}</h2> */}
      {/* {isCreator(poi.user._id) && <button
        // className="button is-danger"
        onClick={handleDelete}
      >☠️ Delete Point of Interest</button>} */}
    </div>
  </div>
}

// import React from 'react'

// const SingleActivity = () => {
//   return <h1>WHY WONT YOU WORK YOU MOTHER FUCKER</h1>

// }

// export default SingleActivity