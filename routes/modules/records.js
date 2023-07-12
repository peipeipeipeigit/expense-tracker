const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')

// 需要改寫成auth過的route

router.get('/records/new', (req, res) => {
  res.render('new')
})


router.get('/records/edit', (req, res) => {
  res.render('edit')
})

module.exports = router