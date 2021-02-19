import Poi from '../models/poi.js'

async function getPoi(_req, res, next) {
  try {
    const poiList = await Poi.find().populate('user')
    res.send(poiList)
  } catch (err) {
    next(err)
  }
}

async function makePoi(req, res, next) {
  const body = req.body
  body.user = req.currentUser

  try {
    const newPoi = await Poi.create(body)
    res.status(201).send(newPoi)
  } catch (err) {
    next(err)
  }

}

async function getSinglePoi(req, res, next) {
  const id = req.params.id

  try {
    const poi = await Poi.findById(id).populate('user')
    res.send(poi)
  } catch (err) {
    next(err)
  }

}

async function removePoi(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser

  try {
    const poiToRemove = await Poi.findByIdAndDelete(id)
    console.log(typeof poiToRemove.user)
    console.log(typeof currentUser._id)

    if (!currentUser._id.equals(poiToRemove.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    await poiToRemove.deleteOne()


    res.send(poiToRemove)


  } catch (err) {
    next(err)
  }

}


async function updatePoi(req, res, next) {
  const id = req.params.id
  const body = req.body

  try {
    const updatedPoi = await Poi.findByIdAndUpdate(id, body, { new: true })
    res.send(updatedPoi)
  } catch (err) {
    next(err)
  }

}


async function makeComment(req, res, next) {
  const commentData = req.body
  const poiId = req.params.poiId
  commentData.user = req.currentUser

  try {
    const poi = await Poi.findById(poiId).populate('comments.user')
    console.log(req.currentUser)
    console.log(commentData)
    if (!poi) {
      return res.status(404).send({ message: 'Not found' })
    }

    poi.comments.push(commentData)
    console.log(poi)
    const savedPoi = await poi.save()

    res.send(savedPoi)


  } catch (err) {
    console.log(err)
    next(err)
  }

}

async function updateComment(req, res, next) {
  console.log('hiiiiiii')
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId, poiId } = req.params

  try {
    const poi = await Poi.findById(poiId).populate('comments.user')

    if (!poi) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = poi.comments.id(commentId)

    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    comment.set(commentData)
    console.log(commentData)

    const savedPoi = await poi.save()

    res.send(savedPoi)

  } catch (err) {
    next(err)
  }
}

export default {
  getPoi,
  makePoi,
  getSinglePoi,
  removePoi,
  updatePoi,
  makeComment,
  updateComment
}