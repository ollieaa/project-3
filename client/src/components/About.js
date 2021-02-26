import React from 'react'

const About = () => {
  return <div>
    <section className="hero is-warning">
      <div className="hero-body">
        <p className="title">
          About
        </p>
      </div>
    </section>

    <section className="card">
      <div className="card-header is-size-2">
        Who we are
      </div>
      <h3 className="subtitle">We are students in the Software Engineering Immersive course taught by General Assembly</h3>
      <ul className="subtitle">Check out our GitHubs!</ul>
      <a href="https://github.com/ketka82uk" target="_blank" rel="noreferrer">Cathy</a>
      <a href="https://github.com/jacobaston" target="_blank" rel="noreferrer">Jake</a>
      <a href="https://github.com/kkherbert" target="_blank" rel="noreferrer">Katherine</a>
      <a href="https://github.com/ollieaa" target="_blank" rel="noreferrer">Ollie</a>
    </section>

    <section className="card">
      <div className="card-header is-size-2">
        What is this project?
      </div>
      <h3 className="subtitle">We were tasked with programming a password-protected, full-stack application that stores data in a NoSQL database and is deployed via Heroku</h3>
      <ul className="subtitle">Technologies used:
        <li>MongoDB</li>
        <li>Express</li>
        <li>React</li>
        <li>Node.js</li>
      </ul>

    </section>






  </div>
}

export default About