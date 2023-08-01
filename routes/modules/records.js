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
  const recordId = req.params.id

  return Record.findOne({ _id: recordId, userId })
    .lean()
    .then(record => {
      Category.findOne({ _id: record.categoryId })
        .lean()
        .then(category => {
          const date = record.date
          res.render('edit', { record, date, recordId })
        })
    })
    .catch(console.error)
})

router.post('/edit/:id', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const recordId = req.params.id
  const error = []
  if (!name || !date || !category || !amount) {
    const record = req.body
    error.push({ message: '所有欄位都是必填。' })
    return res.render('edit', {
      error,
      date,
      recordId,
      record
    })
  }
  Record.findOne({ _id: recordId, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return Category.findOne({ name: category })
        .then(category => {
          record.categoryIcon = category.icon
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(console.error)
    })
})



// delete a record
router.delete('/delete/:id', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id

  return Record.findOneAndRemove({ _id: recordId, userId })
    .then(() => res.redirect('/'))
    .catch(console.error)
})

module.exports = router