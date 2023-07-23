const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Record.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect(`/records/${_id}`))
    .catch(error => console.log(error))
})

module.exports = router