import Restaurant from '../models/restaurants.js'


async function getRestaurant(req, res, next) {
  try {
    const restaurantList = await Restaurant.find()
      .populate('user')
      .populate('comments.user')
    res.send(restaurantList)
  } catch (err) {
    next(err)
  }
}

async function getSingleRestaurant(req, res, next) {
  const id = req.params.restaurantId
  try {
    const restaurant = await Restaurant.findById(id).populate('user').populate('comments.user')
    res.send(restaurant)
    console.log(restaurant)
  } catch (err) {
    next(err)
  }
}


export default {
  getRestaurant,
  getSingleRestaurant
}