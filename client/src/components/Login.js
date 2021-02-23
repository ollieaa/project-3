import React, { useState } from 'react'
import axios from 'axios'

function Login({ history }) {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
        console.log(data.token)
      }
      history.push('/home')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const logoStyle = {
    width: '300px'
  }

  const inputStyle = {
    width: '300px',
    margin: 'auto',
    display: 'block'
  }

  const buttonStyle = {
    margin: 'auto',
    display: 'block'
  }

  return <div>
    <div className="column has-text-centered">
      <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" style={logoStyle} />
      <h1 className="title">Loose End</h1>
    </div>
    <div className="section pt-3">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-centered">Email</label>
            <div className="control has-icons-left" style={inputStyle}>
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name={'email'}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label has-text-centered">Password</label>
            <div className="control has-icons-left" style={inputStyle}>
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name={'password'}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <button className="button is-warning" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  </div>
}

export default Login