import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import dateOnly from '../lib/getDate'

const SingleMeetUp = ({match, history}) => {

  const meetUpId = match.params.meetUpId
  const [meetUp, updateMeetUp] = useState({})
  const [text, updateText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    
    async function getMeetUp() {
      try {
        const {data} = await axios.get(`/api/singleMeetUp/${meetUpId}`)
        console.log(data)
        updateMeetUp(data)
      } catch (err) {
        console.log(err)
      }
    }
    getMeetUp()
  }, [])

  async function handleDelete() {

    await axios.delete(`/api/singleMeetUp/${meetUpId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    history.push('/meetUpSearch')
  }

  async function handleComment() {

    await axios.post(`/api/meetUp/${meetUpId}/comment`, {text}, {
      headers: { Authorization: `Bearer ${token}`}
    })
    updateText('')
    updateMeetUp(response.data)
  }
  async function handleDeleteComment(commentId) {

    await axios.delete(`/api/meetUp/${meetUpId}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    updateMeetUp(response.data)
  }    

  if (!meetUp.date) {
    return null
  }

  return <div id="singleMeetUpPage">
    <div id="singleMeetUpTop">
      <span>{meetUp.location}</span>
      <span>{dateOnly(meetUp.date)}</span>
      <h1>{meetUp.name}</h1>
      {meetUp.tags.map((tag) => {
        return <span key={tag}>
          {tag}
        </span>
      })}
    </div>
    <div id="singleMeetUpMain">
      <div id="singleMeetUpColumnLeft">
        <div className="card" id="description">
          <div className="card-content">
            <div className="content">
              <h2><strong>Description</strong></h2>
              {meetUp.description}
            </div>
          </div>
        </div>
        <div id="comments">
          {meetUp.comments && meetUp.comments.map(comment => {
            return <article key={comment._id} className="media">
              <div className="media-content">
                <div className="content">
                  <p className="subtitle">
                    {comment.user.username}
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
              {/* {isCreator(comment.user._id) && */}
              <div className="media-right">
                <button
                  className="delete"
                  onClick={() => handleDeleteComment(comment._id)}>
                </button>
              </div>
              {/* } */}
            </article>
          })}
          <article className="media">
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="Make a comment.."
                    onChange={event => updateText(event.target.value)}
                    value={text}
                  >
                    {text}
                  </textarea>
                </p>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    onClick={handleComment}
                    className="button is-info"
                  > Submit </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div id="singleMeetUpColumnRight">
          <div id="postedByBox">
            <h2>Posted By</h2>
            <div className="card">
              <div className="card-content">
                <Link to={{pathname: `/profile/${meetUp.creator._id}`}}>
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={meetUp.creator.image} alt={meetUp.creator.firstName + " " + meetUp.creator.lastName}/>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{meetUp.creator.firstName + " " + meetUp.creator.lastName}</p>
                      <p className="subtitle is-6">{meetUp.creator.age + " "  + meetUp.creator.homeTown}</p>
                    </div>
                  </div>
                </Link>  
                <div className="content" id="postedByBottom">
                  <div className="tag">{"⭐️ " + meetUp.creator.userReviews.length + " user reviews"}</div>
                  <button>Message them</button>
                </div>
              </div>
            </div>
          </div>
          <div id="suggestionsBox">
            <h2>Suggested Activites</h2>
            <div id="suggestions">
              
            </div>
          </div>
      </div>
    </div>
  </div>
}

export default SingleMeetUp