import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Comment from '../models/comment.js'

const poiSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  tube: { type: String, required: true },
  description: { type: String, required: true },
  types: {
    type: [String],
    required: true, 
    validate: (typesArray) => {
      return typesArray.length > 0
    }
  },
  // user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },

  lat: { type: Number },
  long: { type: Number },
  price: { type: String },
  time: { type: String }, 
  phone: { type: String },
  funfact: { type: String },
  image: { type: String },
  link: { type: String },
  upVotes: { type: Number },
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [ Comment ],
  events: { type: [mongoose.Schema.ObjectId], ref: 'MeetUp' }
})

poiSchema.plugin(uniqueValidator)


export default mongoose.model('Poi', poiSchema)
