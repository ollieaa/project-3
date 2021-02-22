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
import Restaurants from './components/Restaurants.js'
import SingleRestaurant from './components/SingleRestaurant.js'
import UpdateRestaurant from './components/UpdateRestaurant.js'
import CreateRestaurant from './components/CreateRestaurant.js'
import Groups from './components/Groups.js'
import SingleGroup from './components/SingleGroup.js'
import CreateGroup from './components/CreateGroup.js'
import UpdateGroup from './components/UpdateGroup.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'

import 'bulma/css/bulma.css'
import './styles/style.css'

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
      <Route exact path="/activities" component={Activities}/>
      <Route exact path="/singleActivity" component={SingleActivity}/>
      <Route exact path="/createActivity" component={CreateActivity}/>
      <Route exact path="/updateActivity" component={UpdateActivity}/>
      <Route exact path="/activities/food-and-drink" component={Restaurants}/>
      <Route exact path="/activities/create-restaurant" component={CreateRestaurant}/>
      <Route exact path="/activities/update-restaurant/:restaurantId" component={UpdateRestaurant}/>
      <Route exact path="/activities/:restaurantId" component={SingleRestaurant}/>
      <Route exact path="/groups" component={Groups}/>
      <Route exact path="/groups/create-group" component={CreateGroup}/>
      <Route exact path="/groups/update-group/:groupId" component={UpdateGroup}/>
      <Route exact path="/groups/:groupId" component={SingleGroup}/>
      <Route exact path="/updateGroup" component={UpdateGroup}/>
    </Switch>
    <Footer />
  </BrowserRouter>
}

export default App