import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Comment from './comment.js'



const groupsSchema = new mongoose.Schema({
  admin: { type: [mongoose.Schema.ObjectId], ref: 'User'},
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: [mongoose.Schema.ObjectId], ref: 'User'},
  meetups: { type: [mongoose.Schema.ObjectId], ref: 'MeetUp'},
  comments: [ Comment ]
})

export default mongoose.model('Group', groupsSchema)