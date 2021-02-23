import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {getLoggedInUserId} from '../lib/auth.js'
import axios from 'axios'

function Navbar({history}) {

  const [loggedInUser, updateLoggedInUser] = useState([])

  setTimeout(() => {
    
    const userId = getLoggedInUserId()

    async function getLoggedInUser() {
      const {data} = await axios.get(`api/user/${userId}`)
      updateLoggedInUser(data)
    }
    if (userId) {
      getLoggedInUser()
    } else {
      updateLoggedInUser([])
    }
  }, 500)

  function logout() {
    history.push('/home')
    localStorage.removeItem('token')
  }

  return <nav className="navbar" role="navigation" aria-label="main navigation">
           <div className="navbar-brand">
             <Link className="navbar-item" to={'/home'}>
               <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
             </Link>        
             <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"         data-target="navbarBasicExample">
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
             </a>
           </div>
         
           <div id="navbarBasicExample" className="navbar-menu">
             <div className="navbar-start">
               <Link className="navbar-item" to={'/home'}>
                 Home
               </Link>
         
               <Link className="navbar-item" to={'/meetUpSearch'}>
                 MeetUps
               </Link>
               <Link className="navbar-item" to={'/createMeetUp'}>
                 New MeetUp
               </Link>
         
               <div className="navbar-item has-dropdown is-hoverable">
                 <a className="navbar-link">
                   Activities
                 </a>
         
                 <div className="navbar-dropdown">
                   <Link className="navbar-item" to={'/activities'}>
                     All Activities
                   </Link>
                   <Link className="navbar-item" to={'/activities/food-and-drink'}>
                     Food & Drink
                   </Link>
                   <Link className="navbar-item" to={'/poi'}>
                     Points of Interest
                   </Link>
                 </div>
               </div>
             </div>
         
             <div className="navbar-end">

               {loggedInUser && <div className="navbar-item">
                 <div className="navbar-item has-dropdown is-hoverable">
                   <figure className="image is-32x32">
                     <img className="is-rounded" src={loggedInUser.image}/>
                   </figure> 
                   <a className="navbar-link"></a>
                            
                   <div className="navbar-dropdown">
                     <p className="navbar-item tag">{loggedInUser.firstName + ' ' + loggedInUser.lastName}</p>
                     {/* <hr className="navbar-divider"/> */}
                     <Link className="navbar-item" to={`/profile/${loggedInUser._id}`}>
                       Profile
                     </Link>
                     <Link className="navbar-item" to={`/inbox/${loggedInUser._id}`}>
                       Messages
                     </Link>
                     <Link className="navbar-item" to={'/poi'}>
                       Your MeetUps
                     </Link>
                   </div>
                 </div>
               </div>}
               <div className="navbar-item">
                 <div className="buttons">
                   {loggedInUser.length === 0 &&
                   <Link className="button is-primary" to={'/register'}>
                     <strong>Sign up</strong>
                   </Link>}
                   {loggedInUser.length === 0 &&
                   <Link className="button is-light" to={'/login'}>
                     Log in
                   </Link>}
                   {loggedInUser._id &&
                   <button className="button is-primary" onClick={logout}>Sign Out</button>}                  
                 </div>
               </div>
             </div>
           </div>
         </nav>
}

export default withRouter(Navbar)
