import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
//import mongooseHidden from 'mongoose-hidden'
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
  restaurantWishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Restaurant' }],
  poiWishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Poi' }],
  groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group' }],
  userReviews: [ CommentSchema ],
  inbox: [ CommentSchema ]
})

userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)
//userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

export default mongoose.model('User', userSchema)

//"password": "$2b$10$Ox98wR6L8ZGkeT5LVi1UzOJx464rdYijL6KpDrYd3UgTmcubxBYT.",
