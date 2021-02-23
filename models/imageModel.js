import mongoose from 'mongoose'
const imageSchema = new mongoose.Schema({
  caption: { type: String },
  url: { type: String, required: true }
})
export default mongoose.model('Image', imageSchema)