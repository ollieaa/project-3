import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'
import CommentSchema from '../models/comment.js'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  age: { type: Number },
  admin: { type: Boolean },
  homeTown: { type: String },
  eventsAttended: [{ type: mongoose.Schema.ObjectId, ref: 'MeetUp' }],
  eventsCreated: [{ type: mongoose.Schema.ObjectId, ref: 'MeetUp'  }],
  upcomingEvents: [{ type: mongoose.Schema.ObjectId, ref: 'MeetUp' }],
  interests: { type: [String ] },
  wishlist: { type: [String ] },
  userReviews: [ CommentSchema ],
  inbox: [ CommentSchema ]
})

userSchema.pre('save', function encryptPassword(next){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

userSchema.methods.validatePassword = function validatePassword(inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password)
}

userSchema.plugin(uniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

export default mongoose.model('User', userSchema)