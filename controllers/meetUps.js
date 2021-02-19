import MeetUps from '../models/meetUps.js'
import router from '../views/router.js'

router.route('/meetUps')
  .post(secureRoute, meetUps.postMeetUp)

router.route('/meetUps/:location')  
  .get(meetUps.getMeetUpsByL)

router.route('/meetUps/:location/:category')
  .get(meetUps.getMeetUpByLC)

router.route('/meetUps/:location/:date')
  .get(meetUps.getMeetUpByLD)

router.route('/meetUps/:location/:category/:date')
  .get(meetUps.getMeetUpByLCD)

router.route('/meetUps/:meetUpId')  
  .get()
  .put(secureRoute)
  .delete(secureRoute)

async function getMeetUpsByL(req, res, next) {
  const location = req.params.location
  try {
    const meetUpsList = await MeetUps.find({location: location}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function getMeetUpsByLC(req, res, next) {
  const {location, category} = req.params
  try {
    const meetUpsList = await MeetUps.find({location: location, category: category}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function getMeetUpsByLD(req, res, next) {
  const {location, date} = req.params
  try {
    const meetUpsList = await MeetUps.find({location: location, date: date}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function getMeetUpsByLCD(req, res, next) {
  const {location, category, date} = req.params
  try {
    const meetUpsList = await MeetUps.find({location: location, category: category, date: date}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function postMeetUp(req, res, next) {
  const body = req.body
  body.creator = req.currentUser
  try {
    const newMeetUp = await MeetUps.create(body)
    res.status(201).send(newMeetUp)
  } catch (err) {
    next(err)
  }
}

async function getSingleMeetUp(req, res, next) {
  const id = req.params.meetUpId
  try {
    const meetUp = await (await MeetUps.findById(id)).populate('creator').populate('comments.user').populate('poiSuggestions').populate('restaurantSuggestions').populate('attendees')
    res.send(meetUp)
  } catch (err) {
    next(err)
  }
}

async function deleteMeetUp(req, res, next) {
  const id = req.params.meetUpId
  const currentUser = req.currentUser
  try {
    const meetUpToDelete = await (await MeetUps.findById(id)).populate('creator')
    if (!currentUser._id.equals(meetUpToDelete.creator)) {
      return res.status(401).send({message: 'Unauthorized Access'})
    }
    await meetUpToDelete.deleteOne()
    res.send(meetUpToDelete)
  } catch (err) {
    next(err)
  }
}

async function updateMeetUp(req, res, next) {
  const id = req.params.meetUpId
  const currentUser = req.currentUser
  const body = req.body
  try {
    const meetUpToUpdate = await MeetUps.findById(id)
    if (!meetUpToUpdate) {
      return res.status(404).send({message: 'MeetUp Not Found'})
    }
    if (!currentUser._id.equals(meetUpToUpdate.creator)) {
      return res.status(401).send({message: 'Unauthorized Access'})
    }
    meetUpToUpdate.set(body)
    meetUpToUpdate.save()
  } catch (err) {
    next(err)
  }
}

export default {
  getMeetUpsByL,
  getMeetUpsByLC,
  getMeetUpsByLD,
  getMeetUpsByLCD,
  postMeetUp,
  getSingleMeetUp,
  deleteMeetUp,
  updateMeetUp
}