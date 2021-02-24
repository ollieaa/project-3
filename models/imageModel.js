import mongoose from 'mongoose'
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})
export default mongoose.model('Image', imageSchema)