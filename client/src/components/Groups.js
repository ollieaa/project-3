import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

const Groups = ({ history }) => {
  const [groupsData, updateGroupsData] = useState([])
  const [inputValue, updateInputValue] = useState('')
  const [passcodeMatch, updatePasscodeMatch] = useState(false)
  const [passcodeSubmit, updatePasscodeSubmit] = useState(false)
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
    updatePasscodeSubmit(true)
    try {
      groupsData.map((group) => {
        console.log(inputValue)
        if (group.passcode === inputValue) {
          updatePasscodeMatch(true)
          history.push(`/groups/${group._id}`)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  function NoPasscodeMatch() {
    if (passcodeSubmit && !passcodeMatch) {
      return <div>No match</div>
    } else {
      return null
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
        <NoPasscodeMatch />
      </div>
    </div>

    {loggedIn && <div className="button is-success"><Link to='/groups/create-group'>Add new group</Link></div>}

  </div>
}

export default Groups