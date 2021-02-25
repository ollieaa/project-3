import React from 'react'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth.js'
import RandomRestaurant from './RandomEvent.js'
import RandomPoi from './RandomPoi.js'

const logo = '././images/logo.png'

const Home = () => {

  const loggedIn = getLoggedInUserId()
  const pages = '././images/pages.png'
  const pin = '././images/pin.png'
  const edition = '././images/edition.png'

  const logoStyle = {
    width: '300px'
  }

  const backgroundStyle = {
    backgroundColor: 'lightgray'
  }

  const signUpButtonStyle = {
    width: '91px',
    margin: 'auto',
    display: 'block'
  }

  const navButton = {
    width: '200px'
  }

  const heroStyle = {
    height: '70vh'
  }

  const rightStyle = {
    marginTop: '10%'
  }

  const leftStyle = {
    marginTop: '2%'
  }

  const pinStyle = {
    width: '50px'
  }

  const titleStyle = {
    marginRight: '9%',
    color: '#FFB602'
  }

  return <main>
    <div>
      <div className="columns" style={heroStyle}>
        <div className="column has-text-right" style={leftStyle}>
          <img src={logo} style={logoStyle} />
          <h1 className="title is-size-1" style={titleStyle}>Loose End</h1>
        </div>
        <div className="column has-text-left pl-6" style={rightStyle}>
          <h2 className="title is-size-2">New Places.</h2>
          <h2 className="title is-size-2">New People.</h2>
          {!loggedIn && <Link className="button is-warning" to={'/register'}>Sign Up</Link>}
        </div>
      </div>
      <div className="has-text-centered">
        <Link to={'/meetUpSearch'} className="button is-normal is-warning m-2" style={navButton}>Meet Ups</Link>
        <Link to={'/activities'} className="button is-normal is-warning mt-2 mb-2" style={navButton}>Restaurants</Link>
        <Link to={'/groups'} className="button is-normal is-warning m-2" style={navButton}>Groups</Link>
        <Link to={'/poi'} className="button is-normal is-warning mt-2" style={navButton}>Points of Interest</Link>
      </div>
    </div>
    <div className="has-text-centered mt-3">
      <p className="title"><strong>Restaurants in London, GB</strong></p>
    </div>
    <div className="columns m-5">
      <div className="column">
        <RandomRestaurant />
      </div>
      <div className="column">
        <RandomRestaurant />
      </div>
      <div className="column">
        <RandomRestaurant />
      </div>
      <div className="column">
        <RandomRestaurant />
      </div>
    </div>
    <div style={backgroundStyle}>
      <div className="columns has-text-centered pt-3 pb-4 m-0">
        <div className="column">
          <img src={pages} style={pinStyle} />
          <h2 className="is-size-4"><strong>Sign Up</strong></h2>
          <h4>A Loose End account is your passport to what’s happening in the world. Sign up to find local hidden gems and meet great people along the way</h4>
        </div>
        <div className="column">
          <img src={pin} style={pinStyle} />
          <h2 className="is-size-4"><strong>Browse</strong></h2>
          <h4>Browse the great selection of already existing meetups, local hotspots, things to do and groups. Your only one click away from your next adventure</h4>
        </div>
        <div className="column">
          <img src={edition} style={pinStyle} />
          <h2 className="is-size-4"><strong>Create</strong></h2>
          <h4>Feeling at a Loose End, create your own meet ups, points of interests and groups. </h4>
        </div>
      </div>
      <div className="pb-3">
        {!loggedIn && <Link className="button is-warning mb-3" to={'/register'} style={signUpButtonStyle}>Sign Up</Link>}
      </div>
    </div>
    <div className="has-text-centered mt-3">
      <p className="title"><strong>Points on interest in London, GB</strong></p>
    </div>
    <div className="columns m-5">
      <div className="column">
        <RandomPoi />
      </div>
      <div className="column">
        <RandomPoi />
      </div>
      <div className="column">
        <RandomPoi />
      </div>
      <div className="column">
        <RandomPoi />
      </div>
    </div>
  </main>
}

export default Home