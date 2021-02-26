import Image from '../models/imageModel.js'

async function getImage(req, res, next) {
  try {
    const imageList = await Image.find()
    res.send(imageList)
  } catch (err) {
    next(err)
  }
}

async function getSingleImage(req, res, next) {
  const id = req.params.imageId
  try {
    const image = await Image.findById(id)
    res.send(image)
  } catch (err) {
    next(err)
  }
}

async function postImage(req, res, next) {
  const body = req.body
  body.creator = req.currentUser
  try {
    const newImage = await Image.create(body)
    res.status(201).send(newImage)
  } catch (err) {
    next(err)
  }
}

async function postImageRegister(req, res, next) {
  const body = req.body
  console.log(body)
  body.creator = req.currentUser
  try {
    const newImage = await Image.create(body)
    res.status(201).send(newImage)
  } catch (err) {
    next(err)
  }
}

async function updateImage(req, res, next) {
  const id = req.params.imageId
  const body = req.body
  const currentUser = req.currentUser
  console.log(currentUser.admin)
  try {
    const updatedImage = await Image.findById(id)
    if (!currentUser._id.equals(updatedImage.creator) && !currentUser.admin) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await updatedImage.updateOne(body, { new: true })
    res.send(updatedImage)
  } catch (err) {
    next(err)
    console.log(currentUser)
  }

}

export default {
  postImage,
  getImage,
  updateImage,
  getSingleImage,
  postImageRegister
}