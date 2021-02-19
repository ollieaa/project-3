import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/Register.js'
import Login from './components/Login.js'
import Home from './components/Home.js'


import 'bulma'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path='/home' component={Home} />
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
  </BrowserRouter>
}

export default App