import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

const Groups = ({ history }) => {
  const [groupsData, updateGroupsData] = useState([])
  const [inputValue, updateInputValue] = useState('')
  const loggedIn = getLoggedInUserId()

  useEffect(() => {
    axios.get('/api/groups')
      .then(resp => {
        updateGroupsData(resp.data)
      })
  }, [])

  
  function handleSubmit(event) {
    event.preventDefault()
    console.log(inputValue)
    try {
      groupsData.map((group) => {
        console.log(group.passcode)
        console.log(inputValue)
        if (group.passcode === inputValue) {
          history.push(`/groups/${group._id}`)
        } else {
          console.log('Passcode does not match any known groups')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }



  function handleChange(input) {
    updateInputValue(input.target.value)
  }

  return <div className="container">
    <div className="field">
      <label className="label">Join group</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Enter group passcode"
          onChange={handleChange}
          value={inputValue}></input>
        <button className="button is-danger" onClick={handleSubmit}>Submit</button>
      </div>
    </div>

    {loggedIn && <div className="button is-success"><Link to='/groups/create-group'>Add new group</Link></div>}

  </div>
}

export default Groups