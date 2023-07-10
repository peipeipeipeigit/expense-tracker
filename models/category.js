const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  // 一個類別對應多筆資料
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Record'
  }]
})

module.exports = mongoose.model('Category', categorySchema)