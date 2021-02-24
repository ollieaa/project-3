import React from 'react'
import { Link } from 'react-router-dom'

import RandomRestaurant from './RandomEvent.js'
import RandomPoi from './RandomPoi.js'

const Home = () => {

  const logoStyle = {
    width: '500px'
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

  return <main>
    <div>
      <div className="columns" style={heroStyle}>
        <div className="column has-text-right" style={leftStyle}>
          <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" style={logoStyle} />
          <h1 className="title"></h1>
        </div>
        <div className="column has-text-left pl-6" style={rightStyle}>
          <h2 className="title is-size-1">New Places.</h2>
          <h2 className="title is-size-1">New People.</h2>
          <Link className="button is-warning" to={'/register'}>Sign Up</Link>
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
      <p><strong>Restaurants in London, GB</strong></p>
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
      <div className="columns has-text-centered pt-6 pb-4 m-0">
        <div className="column">
          <h2 className="is-size-4"><strong>Sign Up</strong></h2>
          <h4>Sign up</h4>
        </div>
        <div className="column">
          <h2 className="is-size-4"><strong>Browse</strong></h2>
          <h4>Browers our great selection of meet ups, local hotspots, things to do</h4>
        </div>
        <div className="column">
          <h2 className="is-size-4"><strong>Create</strong></h2>
          <h4>Create you own meet ups and points of interest</h4>
        </div>
      </div>
      <div className="pb-3">
        <Link className="button is-warning mb-3" to={'/register'} style={signUpButtonStyle}>Sign Up</Link>
      </div>
    </div>
    <div className="has-text-centered mt-3">
      <p><strong>Points on interest in London, GB</strong></p>
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