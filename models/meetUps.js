import mongoose from 'mongoose'
import Comment from './comment.js'


const MeetUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  comments: [Comment],
  poiSuggestions: { type: [mongoose.Schema.ObjectId], ref: 'Poi' },
  restaurantSuggestions: { type: [mongoose.Schema.ObjectId], ref: 'Restaurant' },
  attendees: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  isActive: { type: Boolean },
  upVote: { type: Number },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

export default mongoose.model('MeetUp', MeetUpSchema)