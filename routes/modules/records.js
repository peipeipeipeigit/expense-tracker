// db setting
const express = require('express')
const router = express.Router()

// requires models
const User = require('../../models/user')
const Record = require('../../models/record')
const Category = require('../../models/category')


// add a new record
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  console.log(req.body)
  const error = []
  if (!name || !date || !category || !amount) {
    error.push({ message: '所有欄位都是必填' })
    return res.render('new', {
      error,
      name,
      date,
      category,
      amount
    })
  }
  Category.findOne({ name: category })
    .then(data => {
      const categoryId = data._id
      return Record.create({ name, date, category, categoryIcon: data.icon, amount, userId, categoryId })
    })
    .then(() => res.redirect('/'))
    .catch(console.error)
})


// edit a specific record
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.post('/edit/:id', (req, res) => {
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




// delete a record

module.exports = router