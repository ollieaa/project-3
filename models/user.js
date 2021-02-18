import mongoose from 'mongoose'
import CommentSchema from '../models/comment.js'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  image: { type: String },
  age: { type: Number },
  admin: { type: String },
  homeTown: { type: String },
  eventsAttended: { type: mongoose.Schema.ObjectId, ref: 'MeetUp' },
  eventsCreated: { type: mongoose.Schema.ObjectId, ref: 'MeetUp'  },
  upcomingEvents: { type: mongoose.Schema.ObjectId, ref: 'MeetUp' },
  interests: { type: [String ] },
  wishlist: { type: [String ] },
  userReviews: [ CommentSchema ],
  inbox: [ CommentSchema ]
})

export default mongoose.model('User', userSchema)