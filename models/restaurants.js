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
  location: { type: String },
  address: { type: [] },
  phone: { type: String },
  upVotes: { type: Number },
  //postedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  comments: [ Comment ]
  //events: { type: mongoose.Schema.ObjectId, ref: 'MeetUp' }
})

export default mongoose.model('Restaurant', RestaurantSchema)