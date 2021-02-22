import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Groups = () => {
  const [groupsData, updateGroupsData] = useState([])

  useEffect(() => {
    axios.get('/api/groups')
      .then(resp => {
        updateGroupsData(resp.data)
      })
  }, [])

  return <div className="container">
    <div className="field">
      <label className="label">Join group</label>
      <div className="control">
        <input className="input" type="text" placeholder="Enter group passcode"></input>
        <button className="button is-danger">Submit</button>
      </div>
    </div>

    <div className="button is-success"><Link to='/groups/create-group'>Add new group</Link></div>

  </div>
}

export default Groups