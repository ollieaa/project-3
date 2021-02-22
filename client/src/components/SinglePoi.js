// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { isCreator } from '../lib/auth'

// export default function SingleActivity({ match, history }) {
  
//   const poiId = match.params.poiId
//   const [poi, updatePoi] = useState({})

//   useEffect(() => {
//     async function fetchPoi() {
//       try {
//         const { data } = await axios.get(`/api/poi/${poiId}`)
//         updatePoi(data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     fetchPoi()
//   }, [])

//   async function handleDelete() {
//     const token = localStorage.getItem('token')
//     await axios.delete(`/api/poi/${poiId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     history.push('/activities')
//   }

//   if (!poi.user) {
//     return null
//   }

//   return <div className="individual-site-page">
//     <div className="column">
//       <h1>{poi.name}</h1>
//       <img src={poi.image} alt={poi.name}/>
//       <h2>{poi.description}</h2>
//       <h2>{`Posted by: ${poi.user.username}`}</h2>
//       {isCreator(poi.user._id) && <button
//         // className="button is-danger"
//         onClick={handleDelete}
//       >☠️ Delete Point of Interest</button>}
//     </div>
//   </div>
// }

import React from 'react'

const SingleActivity = () => {
  return <h1>WHY WONT YOU WORK YOU MOTHER FUCKER</h1>

}

export default SingleActivity