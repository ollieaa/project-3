import React from 'react'

const About = () => {
  return <div>

    {/*
    // * TITLE SECTION
    */}

    <section className="hero is-warning">
      <div className="hero-body">
        <p className="title">
          About us
        </p>
      </div>
    </section>

    <div className="container">

      <section className="card about-page m-4">
        <div className="card-content">
          <div className="content">
            <p className="title">About us</p>
          </div>
          <div className="content">
            <h3 className="subtitle">We are students in the Software Engineering Immersive course taught by General Assembly</h3>
            <ul className="subtitle">Check out our GitHubs!</ul>
            <li>
              <a href="https://github.com/ketka82uk" target="_blank" rel="noreferrer">Cathy</a>
            </li>
            <li>
              <a href="https://github.com/jacobaston" target="_blank" rel="noreferrer">Jake</a>

            </li>
            <li>
              <a href="https://github.com/kkherbert" target="_blank" rel="noreferrer">Katherine</a>
            </li>

            <li>
              <a href="https://github.com/ollieaa" target="_blank" rel="noreferrer">Ollie</a>

            </li>
          </div>
        </div>
      </section>

      <section className="card about-page m-4">
        <div className="card-content">
          <div className="content">
            <div className="title">
              About out project
            </div>
          </div>
          <div className="content">
            <h3 className="subtitle">We were tasked with programming a password-protected, full-stack application that stores data in a NoSQL database and is deployed via Heroku</h3>
            <ul className="subtitle">Technologies used:</ul>
            <li>MongoDB</li>
            <li>Express</li>
            <li>React</li>
            <li>Node.js</li>
          </div>
        </div>
      </section>
    </div>

  </div>

}

export default About