import Group from '../models/groups.js'
import User from '../models/user.js'


async function getGroup(req, res, next) {
  try {
    const groupList = await Group.find().populate('creator')
    res.send(groupList)
  } catch (err) {
    next(err)
  }
}

async function getSingleGroup(req, res, next) {
  const id = req.params.groupId
  try {
    const group = await Group.findById(id).populate('creator').populate('members')
    res.send(group)
  } catch (err) {
    next(err)
  }
}

async function postGroup(req, res, next) {
  const body = req.body
  body.creator = req.currentUser
  try {
    const newGroup = await Group.create(body)
    res.status(201).send(newGroup)
  } catch (err) {
    next(err)
  }

}

async function deleteGroup(req, res, next) {
  const id = req.params.groupId
  const currentUser = req.currentUser

  try {
    const groupToDelete = await Group.findByIdAndDelete(id)
    if (!currentUser._id.equals(groupToDelete.creator)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await groupToDelete.deleteOne()
    res.send(groupToDelete)
  } catch (err) {
    next(err)
  }
}

async function updateGroup(req, res, next) {
  const id = req.params.groupId
  const body = req.body
  const currentUser = req.currentUser
  try {
    const updatedGroup = await Group.findByIdAndUpdate(id, body, { new: true })
    if (!currentUser._id.equals(updatedGroup.creator)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await updatedGroup.deleteOne()
    res.send(updatedGroup)
  } catch (err) {
    next(err)
  }

}


export default {
  getGroup,
  getSingleGroup,
  postGroup,
  updateGroup,
  deleteGroup
}