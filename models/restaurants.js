import mongoose from 'mongoose'
import Comment from './comment.js'


const RestaurantSchema = new mongoose.Schema({

  name: { type: String },
  category: { type: [], required: true },
  image: { type: String },
  link: { type: String },
  price: { type: String },
  lat: { type: Number },
  long: { type: Number },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  zipcode: { type: String },
  country: { type: String },
  phone: { type: String },
  upVotes: { type: Number },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ Comment ],
  meetUps: { type: mongoose.Schema.ObjectId, ref: 'MeetUp' }
})

export default mongoose.model('Restaurant', RestaurantSchema)