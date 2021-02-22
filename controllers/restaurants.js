import Restaurant from '../models/restaurants.js'


async function getRestaurant(req, res, next) {
  try {
    const restaurantList = await Restaurant.find().populate('creator')
    res.send(restaurantList)
  } catch (err) {
    next(err)
  }
}

async function getSingleRestaurant(req, res, next) {
  const id = req.params.restaurantId
  try {
    const restaurant = await Restaurant.findById(id).populate('creator').populate('comments.creator')
    res.send(restaurant)
    console.log(restaurant)
  } catch (err) {
    next(err)
  }
}

async function postRestaurant(req, res, next) {
  const body = req.body
  body.creator = req.currentUser
  try {
    const newRestaurant = await Restaurant.create(body)
    res.status(201).send(newRestaurant)
  } catch (err) {
    next(err)
  }

}

async function deleteRestaurant(req, res, next) {
  const id = req.params.restaurantId
  const currentUser = req.currentUser

  try {
    const restaurantToDelete = await Restaurant.findByIdAndDelete(id)
    if (!currentUser._id.equals(restaurantToDelete.creator)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await restaurantToDelete.deleteOne()
    res.send(restaurantToDelete)
  } catch (err) {
    next(err)
  }
}

async function updateRestaurant(req, res, next) {
  const id = req.params.restaurantId
  const body = req.body
  const currentUser = req.currentUser
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, body, { new: true })
    if (!currentUser._id.equals(updatedRestaurant.creator)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await updatedRestaurant.deleteOne()
    res.send(updatedRestaurant)
  } catch (err) {
    next(err)
  }

}



export default {
  getRestaurant,
  getSingleRestaurant,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant
}