import express from 'express'
import restaurants from '../controllers/restaurants.js'
//import poi from '../controllers/poi.js'
//import user from '../controllers/user.js'
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

router.route('/restaurants')
  .get(restaurants.getRestaurant)

router.route('/restaurants/:restaurantId')
  .get(restaurants.getSingleRestaurant)
  .put()
  .delete()
  
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
	.post(secureRoute)

router.route('/login')
	.post(secureRoute)

router.route('/user')
	.get(secureRoute)
	.post(secureRoute)
	.put(secureRoute)
	.delete(secureRoute)

router.route('/user/inbox')
	.get(secureRoute)

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