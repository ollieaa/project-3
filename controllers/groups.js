import Group from '../models/groups.js'

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
  body.members = req.currentUser
  body.admins = req.currentUser
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
    const groupToDelete = await Group.findById(id)
    if (!currentUser._id.equals(groupToDelete.creator) && !currentUser.admin) {
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
  console.log(currentUser.admin)
  try {
    const updatedGroup = await Group.findById(id)
    if (!currentUser._id.equals(updatedGroup.creator) && !currentUser.admin) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await updatedGroup.updateOne(body, { new: true })
    res.send(updatedGroup)
  } catch (err) {
    next(err)
    console.log(currentUser)
  }

}


export default {
  getGroup,
  getSingleGroup,
  postGroup,
  updateGroup,
  deleteGroup
}