// Record model
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
    min: [1, '金額不能為0!'],
    required: true
  },
  userId: {  
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },

})

module.exports = mongoose.model('Record', recordSchema)