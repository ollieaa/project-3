import React from 'react'
import { Link } from 'react-router-dom'

const backgroundStyle = {
  backgroundColor: '#191919',
  color: 'white'
}

const Footer = () => {

  const style = {
    color: 'white'
  }

  return <footer className="columns" style={backgroundStyle}>
    <div className="column">
      <h2 className="title m-5" style={style}>Loose End</h2>
      <div>
        <h4 className="subtitle ml-5 mb-1" style={style}>New Places.</h4>
        <h4 className="subtitle ml-5" style={style}>New People.</h4>
      </div>
    </div>
    <div className="column">
      <h2 className="title mt-5 mb-5" style={style}>Explore</h2>
      <Link to={'/home'}><h4 className="subtitle is-size-6 mb-1" style={style}>Home</h4></Link>
      <Link to={'/about'}><h4 className="subtitle is-size-6 mb-1" style={style}>About</h4></Link>
      <Link to={'/meetUp'}><h4 className="subtitle is-size-6 mb-1" style={style}>Meet Ups</h4></Link>
      <Link to={'/activities'}><h4 className="subtitle is-size-6 mb-1" style={style}>Restaurants</h4></Link>
      <Link to={'/groups'}><h4 className="subtitle is-size-6 mb-1" style={style}>Groups</h4></Link>
      <Link to={'/poi'}><h4 className="subtitle is-size-6 mb-1" style={style}>Points of Interest</h4></Link>
      <Link to ={'/map'}><h4 className="subtitle is-size-6 mb-1" style={style}>Map</h4></Link>


    </div>
    <div className="column">
      <h2 className="title mt-5 mb-5" style={style}>Visit</h2>
      <h4>1 The Relay Building</h4>
      <h4>114 Whitechapel High St</h4>
      <h4>London E1 7PT</h4>
    </div>
    <div className="column">
    </div>
  </footer>
}

export default Footer