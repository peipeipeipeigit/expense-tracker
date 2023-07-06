const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Record.create({ id: i + 1 })
  }
  console.log('done')
})