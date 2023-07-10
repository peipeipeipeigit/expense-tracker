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
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },

  // amount: {
  //   type: Number, 
  //   // required: true 
  // },
  // userId: {
  //   type: Number, 
  // },
  // categoryId: {
  //   type: Number,
  // },

})

module.exports = mongoose.model('Record', recordSchema)