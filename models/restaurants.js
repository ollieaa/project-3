import mongoose from 'mongoose'
import Comment from './comment.js'


const RestaurantSchema = new mongoose.Schema({

  name: {type: String, required: true},
  category: {type: String, required: true},
  image: {type: String},
  link: {type: String},
  price: {type: String},
  lat: {type: String},
  long: {type: String},
  location: {type: String},
  address: {type: String},
  phone: {type: String},
  upVotes: {type: Number},
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [Comment],
  events: { type: mongoose.Schema.ObjectId, ref: 'MeetUp'}
})

export default mongoose.model('Restaurant', RestaurantSchema)