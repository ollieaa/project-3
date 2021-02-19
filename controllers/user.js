import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function register(req, res, next) {
  const body = req.body

  try {
    const user = await User.create(body)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  const password = req.body.password
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(password)) {
      return res.status(401).send({ message: 'Unauthorized, please try again' })
    }
    
    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '24h' }
    )
   
    res.status(202).send({ token, message: 'Login successful!' })
  } catch (err) {
    next(err)
  }
}

async function getUser(_req, res, next) {
  try {
    const userList = await User.find()
    res.status(200).send(userList)
  } catch (err) {
    next(err)
  }
}

async function removeUser(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser
  try {
    const userToRemove = await User.findById(id)

    if (!currentUser._id.equals(userToRemove._id)) {
      return res.status(401).send({ message: 'Unauthorized, you can only delete your own account' })
    }

    await userToRemove.deleteOne()

    res.send(userToRemove)

  } catch (err) {
    next(err)
  }
}

async function updateUser(req, res, next) {
  const id = req.params.id
  const body = req.body
  const currentUser = req.currentUser

  try {
    const userToUpdate = await User.findById(id)

    if (!currentUser._id.equals(userToUpdate._id)) {
      return res.status(401).send({ message: 'Unauthorized, this is not you profile' })
    }
    userToUpdate.set(body)

    await userToUpdate.save()

    res.send(userToUpdate)

  } catch (err) {
    next(err)
  }
}

async function getUserInbox(req, res, next) {
  const id = req.params.id

  try {
    const userInbox = await User.findById(id)
    res.status(200).send(userInbox.inbox)
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
  getUser,
  removeUser,
  updateUser,
  getUserInbox
}