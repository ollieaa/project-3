import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import dateOnly from '../lib/getDate'
import { isCreator } from '../lib/auth.js'
import { RestaurantSuggestion, PoiSuggestion } from './Suggestion.js'

const SingleMeetUp = ({ match, history }) => {

  const meetUpId = match.params.meetUpId
  const [meetUp, updateMeetUp] = useState({})
  const [text, updateText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {

    async function getMeetUp() {
      try {
        const { data } = await axios.get(`/api/singleMeetUp/${meetUpId}`)
        updateMeetUp(data)
      } catch (err) {
        console.log(err)
      }
    }
    getMeetUp()
  }, [])

  async function handleDelete() {

    await axios.delete(`/api/singleMeetUp/${meetUpId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/meetUpSearch')
  }

  async function handleComment() {

    const { data } = await axios.post(`/api/meetUp/${meetUpId}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    updateText('')
    updateMeetUp(data)
  }
  async function handleDeleteComment(commentId) {

    const { data } = await axios.delete(`/api/meetUp/${meetUpId}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    updateMeetUp(data)
  }

  if (!meetUp.date) {
    return null
  }

  return <div id="singleMeetUpPage">
    <section className="hero is-warning is-small">
      <div className="hero-body">
        <p className="subtitle">
          {dateOnly(meetUp.date)}
        </p>
        <p className="title">
          <strong>{meetUp.name}</strong>
        </p>
        <p className="subtitle">
          {meetUp.location[0].toUpperCase() + meetUp.location.slice(1) + ',  ' + meetUp.time}
        </p>

        <div id="meetUpTags">
          {meetUp.tags.map((tag) => {
            return <div key={tag} className="tag is-success is-light singleMeetUpTag">
              {tag[0].toUpperCase() + tag.slice(1)}
            </div>
          })}
        </div>
      </div>
    </section>
    <div id="buttons">
      {isCreator(meetUp.creator._id) && <Link
        to={`/updateMeetUp/${meetUp._id}`}
        className="button is-danger is-light"
      >Update MeetUp</Link>}
      {isCreator(meetUp.creator._id) && <button
        className="button is-danger"
        onClick={handleDelete}
        id="meetUpDeleteButton"
      >Delete MeetUp</button>}
    </div>

    <div id="singleMeetUpMain">
      <div id="singleMeetUpColumns">
        <div id="singleMeetUpColumnLeft">
          <div id="meetUpImageAndDescription">
            <div id="meetUpImage" style={{
              backgroundImage: `url(${meetUp.image})`,
              backgroundSize: 'cover'
            }}></div>
            <div className="card" id="description">
              <div className="card-content">
                <div className="content">
                  <h2><strong>Description</strong></h2>
                  {meetUp.description}
                </div>
              </div>
            </div>
          </div>

          <div id="comments">
            <h2 id="commentsTitle"><strong>Comments</strong></h2>
            {meetUp.comments && meetUp.comments.map(comment => {
              return <article key={comment._id} className="media">
                <div className="media-content">
                  <div className="content meetUpComment">
                    <div className="commentLeft">
                      <figure className="image is-48x48">
                        <img className="is-rounded" src={comment.user.image} />
                      </figure>
                    </div>
                    <div className="commentRight">
                      <p>{comment.text}</p>
                      <p><strong>{comment.user.firstName + ' ' + comment.user.lastName}</strong></p>
                    </div>
                  </div>
                </div>
                {isCreator(comment.user._id) &&
                  <div className="media-right">
                    <button
                      className="delete"
                      onClick={() => handleDeleteComment(comment._id)}>
                    </button>
                  </div>
                }
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
                      className="button is-warning"
                    > Send </button>
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
                <Link to={{ pathname: `/profile/${meetUp.creator._id}` }}>
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={meetUp.creator.image} alt={meetUp.creator.firstName + ' ' + meetUp.creator.lastName} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{meetUp.creator.firstName + ' ' + meetUp.creator.lastName}</p>
                      <p className="subtitle is-6">{meetUp.creator.age + ' ' + meetUp.creator.homeTown}</p>
                    </div>
                  </div>
                </Link>
                <div className="content" id="postedByBottom">
                  <div className="tag">{'⭐️ ' + meetUp.creator.userReviews.length + ' user reviews'}</div>
                  <button>Message them</button>
                </div>
              </div>
            </div>
          </div>
          <div id="suggestionsBox">
            <h2>Suggested Activites</h2>
            <div className="card" id="suggestions">
              <RestaurantSuggestion suggestions={meetUp.restaurantSuggestions} />
              <PoiSuggestion suggestions={meetUp.poiSuggestions} />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
}

export default SingleMeetUp