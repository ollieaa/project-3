import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'

function Comment({ match }) {
  const profileId = match.params.profileId
  
  const [user, updateUser] = useState({})
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')

  console.log(user)

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/user/${profileId}`)
        updateUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  function handleComment() {
    // ! Using the comment endpoint, grab the text from our state.
    axios.post(`/api/user/${user._id}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        // ! Clear my textbox
        setText('')
        // ! Update the comments with my response data
        updateUser(resp.data)
      })
  }

  // ! Delete a comment
  function handleDeleteComment(commentId) {
    // ! Delete a comment (we're passing through the comment ID the user
    //  !has clicked on)
    axios.delete(`/api/user/${user._id}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
  }

  if (!user.user) {
    return null
  }

  return <div>
    {user.userReviews && user.userReviews.map(comment => {
      return <article key={comment._id} className="media">
        <div className="media-content">
          <div className="content">
            <p className="subtitle">
              {comment.user.firstName}
            </p>
            <p>{comment.text}</p>
          </div>
        </div>
        {
          // ! Only the person who created a comment should be able to delete a comment
        }
        {isCreator(comment.user._id) && <div className="media-right">
          <button
            className="delete"
            onClick={() => handleDeleteComment(comment._id)}>
          </button>
        </div>}
      </article>
    })}

    {
      // ! Little form to POST a comment (again lots of bulma)
    }
    <article className="media">
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Make a comment.."
              onChange={event => setText(event.target.value)}
              value={text}
            >
              {text}
            </textarea>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              onClick={handleComment}
              className="button is-info"
            >
              Submit
            </button>
          </p>
        </div>
      </div>
    </article>
  </div>
}

export default Comment