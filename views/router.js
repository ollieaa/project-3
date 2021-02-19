import express from 'express'
//import restaurants from '../controllers/restaurants.js'
//import poi from '../controllers/poi.js'
import user from '../controllers/user.js'
//import meetUps from '../controllers/meetUps.js'
//import comment from '../controllers/comment.js'
//import groups from '../controllers/groups.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.route('/meetups')
  .get()
  .post(secureRoute)
  .put(secureRoute)
  .delete(secureRoute)

router.route('/meetups/:category/:date')
  .get()

router.route('/activities')
  .get()

router.route('/activities/:category’')
  .get()
  .post(secureRoute)
  .put(secureRoute)
  .delete(secureRoute)

router.route('/meetup/:meetUpId/comment')
  .post(secureRoute)

router.route('/meetup/:meetUpId/comment/:commentId')
  .post(secureRoute)
  .put(secureRoute)

router.route('/activities/:activitiesId/comment')
  .post(secureRoute)

router.route('/activities/:activitiesId/comment/:commentId')
  .put(secureRoute)
  .delete(secureRoute)

router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)

router.route('/user')
  .get(user.getUser)

router.route('/user/:id')  
  .put(secureRoute, user.updateUser)
  .delete(secureRoute, user.removeUser)

router.route('/user/inbox')
  .get(user.getUserInbox)

router.route('/user/inbox/:commentId')
  .get(secureRoute)
  .post(secureRoute)
  .put(secureRoute)
  .delete(secureRoute)

router.route('/groups')
  .get(secureRoute)
  .post(secureRoute)

router.route('/groups/:groupId')
  .get(secureRoute)
  .post(secureRoute)
  .put(secureRoute)
  .delete(secureRoute)

export default router