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
import Activities from './components/Activities.js'
import SingleActivity from './components/SingleActivity.js'
import CreateActivity from './components/CreateActivity.js'
import UpdateActivity from './components/UpdateActivity.js'
import Groups from './components/Groups.js'
import CreateGroup from './components/CreateGroup.js'
import UpdateGroup from './components/UpdateGroup.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
// NEW
import MeetUpSearch from './components/MeetUpSearch.js'
import './styles/ollieStyle.scss'




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
      <Route exact path="/meetUp/:meetUpId" component={SingleMeetUp}/>
      <Route exact path="/createMeetUp" component={CreateMeetUp}/>
      <Route exact path="/uodateMeetUp" component={UpdateMeetUp}/>
      <Route exact path="/activities" component={Activities}/>
      <Route exact path="/singleActivity" component={SingleActivity}/>
      <Route exact path="/createActivity" component={CreateActivity}/>
      <Route exact path="/updateActivity" component={UpdateActivity}/>
      <Route exact path="/groups" component={Groups}/>
      <Route exact path="/createGroup" component={CreateGroup}/>
      <Route exact path="/updateGroup" component={UpdateGroup}/>
      {/* NEW */}
      <Route exact path="/meetUpSearch" component={MeetUpSearch}/>
    </Switch>
    <Footer />
  </BrowserRouter>
}

export default App