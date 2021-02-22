import express from 'express'
import restaurants from '../controllers/restaurants.js'
import poi from '../controllers/poi.js'
import user from '../controllers/user.js'
import meetUps from '../controllers/meetUps.js'
//import comment from '../controllers/comment.js'
//import groups from '../controllers/groups.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.route('/meetUps')
  .post(secureRoute, meetUps.postMeetUp)

router.route('/meetUps/:location')  
  .get(meetUps.getMeetUpsByL)

router.route('/meetUps/:location/:category')
  .get(meetUps.getMeetUpsByLC)

router.route('/meetUps/:location/:date')
  .get(meetUps.getMeetUpsByLD)

router.route('/meetUps/:location/:category/:date')
  .get(meetUps.getMeetUpsByLCD)

router.route('/meetUps/:meetUpId')  
  .get(secureRoute)
  .put(secureRoute)
  .delete(secureRoute)
 
router.route('/meetups/:category/:date')  
  .get()

// RESTAURANTS

router.route('/restaurants')
  .get(restaurants.getRestaurant)
  .post(restaurants.postRestaurant)

router.route('/restaurants/:restaurantId')
  .get(restaurants.getSingleRestaurant)
  .put(secureRoute, restaurants.updateRestaurant)
  .delete(secureRoute, restaurants.deleteRestaurant)
  
// POINTS OF INTEREST
router.route('/poi')
  .get(poi.getPoi)
  .post(secureRoute, poi.makePoi)

router.route('/poi/:category’')
  .get(secureRoute)
  .post(secureRoute)
  .put(secureRoute)
  .delete(secureRoute)

router.route('/poi/:poiId')
  .get(poi.getSinglePoi)
  .delete(secureRoute, poi.removePoi)
  .put(secureRoute, poi.updatePoi)

router.route('/poi/:poiId/comment')
  .post(secureRoute, poi.makeComment)

router.route('/poi/:poiId/comment/:commentId')
  .put(secureRoute, poi.updateComment)
// .delete(secureRoute, poi.removeComment)

// END OF POINTS OF INTEREST

router.route('/meetUp/:meetUpId/comment')
  .post(secureRoute)

router.route('/meetUp/:meetUpId/comment/:commentId')
  .post(secureRoute)
  .put(secureRoute)

router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)

router.route('/user')
  .get(user.getUser)

router.route('/user/:id')
  .get(user.getSingleUser)
  .put(secureRoute, user.updateUser)
  .delete(secureRoute, user.removeUser)

router.route('/user/:id/inbox')
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