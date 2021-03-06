import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  seen: { type: Boolean },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: { type: Number }
}, {
  timestamps: true 
})

export default CommentSchema