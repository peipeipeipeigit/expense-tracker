const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String, 
    required: true 
  },
  date: {
    type: Date, 
    required: true 
  },
  amount: {
    type: Number, 
    required: true 
  },
  userId: {
    type: Number, 
  },
  categoryId: {
    type: Number,
  },
 
})
module.exports = mongoose.model('Record', recordSchema)