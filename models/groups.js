import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Comment from './comment.js'

const groupsSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  passcode: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  meetUps: [{ type: mongoose.Schema.ObjectId, ref: 'MeetUp' }],
  comments: [ Comment ]
})

groupsSchema.plugin(uniqueValidator)

export default mongoose.model('Group', groupsSchema)