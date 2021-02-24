import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId, isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'


export default function SingleGroup({ match, history }) {
  const groupId = match.params.groupId
  const [group, updateGroup] = useState([])
  const [user, updateUser] = useState({})
  const [loading, updateLoading] = useState(true)
  //const [commentText, setCommentText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchGroup() {
      try {
        const { data } = await axios.get(`/api/groups/${groupId}`)
        updateGroup(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchGroup()
  }, [])

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { data } = await axios.get(`/api/user/${getLoggedInUserId()}`)
        updateUser(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCurrentUser()
  }, [])

  async function handleUserJoin() {
    const newGroup = user.groups.concat(groupId)
    await axios.put(`/api/user/${user._id}`, { groups: newGroup }, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async function handleDelete() {
    await axios.delete(`/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/home')
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  return <div className="container">

    <article>
      <h1 className="title">{group.name}</h1>
      {!getLoggedInUserId.groups.includes(group._id) && <button className="button is-danger" onClick={handleUserJoin}>Join group</button>}
      <img src={group.image} alt={group.name} />
    </article>

    <article>
      <h2 className="subtitle">{`Creator: ${group.creator.firstName} ${group.creator.lastName}`}</h2>
      <img src={group.creator.image} className="avatar"></img>
      <button className="button is-danger">Contact {group.creator.firstName}</button>
      <h2 className="subtitle">{`Description: ${group.description}`}</h2>
    </article>

    <article>
      <button className="button is-danger">Create meet-up for {group.name}</button>
      <button className="button is-danger">Add member to {group.name}</button>
    </article>

    <article>
      <div><h2 className="title">Members section</h2></div>
      <h2 className="subtitle">Group members are listed here with name and avatar - link to profile</h2>
      {group.members.map((member) => {
        return <div className="card" key={member._id}>{member.firstName}</div>
      })}
    </article>

    <article>
      <div><h2 className="title">Up-coming events section</h2></div>
      <h2 className="subtitle">All future events are listed here</h2>
      <div className="card">Future event</div>
      <div className="card">Future event</div>
      <div className="card">Future event</div>
      <div className="card">Future event</div>
    </article>

    <article>
      <div><h2 className="title">Previous events section</h2></div>
      <h2 className="subtitle">All previous events are listed here</h2>
      <div className="card">Previous event</div>
      <div className="card">Previous event</div>
      <div className="card">Previous event</div>
      <div className="card">Previous event</div>
    </article>

    <article>
      <div><h2 className="title">Comments section</h2></div>
      <h2 className="subtitle">All member comments are shown here</h2>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Make a comment.."
            >
            </textarea>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              className="button is-danger"
            >
              Submit
            </button>
          </p>
        </div>
      </div>
    </article>


    <article>
      {(isCreator(group.creator._id) || user.admin)
        && <button
          className="button is-success"
          onClick={handleDelete}
        >Delete Group</button>}
      {(isCreator(group.creator._id) || user.admin)
        && <Link
          to={`/groups/update-group/${group._id}`}
          className="button is-success"
        >Update Group</Link>}
    </article>
  </div>
}