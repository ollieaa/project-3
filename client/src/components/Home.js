import React from 'react'

const Home = () => {

  const style = {
    width: '300px'
  }

  return <div>
    <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" style={style} />
    <div>
      <h1 className="title">New Places.</h1>
      <h1 className="title">New People.</h1>
      <button className="button is-warning">Join Up</button>
    </div>
    <div>
      <h3>Tell us what you want to do</h3>
    </div>
    <div>
      <div className="field has-addons has-addons-centered">
        <div className="control">
          <span className="select">
            <select>
              <option>Meet Up</option>
              <option>Restaurant</option>
              <option>Point of Interest</option>
            </select>
          </span>
        </div>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Where?" />
        </div>
        <div className="control">
          <button className="button is-warning">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
}

export default Home