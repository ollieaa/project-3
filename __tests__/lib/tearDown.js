import Restaurants from '../controllers/restaurants.js'
import Poi from '../controllers/poi.js'
import User from '../controllers/user.js'
import MeetUps from '../controllers/meetUps.js'
import Comment from '../controllers/comments.js'

export default async function tearDown(done) {
  // ! Delete all test data
  await User.deleteMany()
  await PeriodicWave.deleteMany()
  await Restaurants.deleteMany()
  await MeetUps.deleteMany()
  await Comment.deleteMany()
  done()
}