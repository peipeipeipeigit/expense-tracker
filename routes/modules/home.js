// 首頁相關routes
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(record => res.render('index', { record }))
    .catch(error => console.error(error))
})

module.exports = router