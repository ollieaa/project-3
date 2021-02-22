import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/Register.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import About from './components/About.js'
import Profile from './components/Profile.js'
import UpdateProfile from './components/UpdateProfile.js'
import Inbox from './components/Inbox.js'
import MeetUp from './components/MeetUp.js'
import SingleMeetUp from './components/SingleMeetUp.js'
import CreateMeetUp from './components/CreateMeetUp.js'
import UpdateMeetUp from './components/UpdateMeetUp.js'
import Poi from './components/Poi.js'
import SinglePoi from './components/SinglePoi.js'
import CreatePoi from './components/CreatePoi.js'
import UpdatePoi from './components/UpdatePoi.js'
import Groups from './components/Groups.js'
import CreateGroup from './components/CreateGroup.js'
import UpdateGroup from './components/UpdateGroup.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'







import 'bulma'

const App = () => {
  return <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/home' component={Home} />
      <Route exact path="/about" component={About}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/updateProfile" component={UpdateProfile}/>
      <Route exact path="/inbox" component={Inbox}/>
      <Route exact path="/meetUp" component={MeetUp}/>
      <Route exact path="/singleMeetUp" component={SingleMeetUp}/>
      <Route exact path="/createMeetUp" component={CreateMeetUp}/>
      <Route exact path="/uodateMeetUp" component={UpdateMeetUp}/>
      <Route exact path="/poi" component={Poi}/>
      <Route exact path="/poi/:poiId" component={SinglePoi}/>
      <Route exact path="/createPoi" component={CreatePoi}/>
      <Route exact path="/updatePoi" component={UpdatePoi}/>
      <Route exact path="/groups" component={Groups}/>
      <Route exact path="/createGroup" component={CreateGroup}/>
      <Route exact path="/updateGroup" component={UpdateGroup}/>
    </Switch>
    <Footer />
  </BrowserRouter>
}

export default App