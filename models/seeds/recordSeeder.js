const Record = require('../record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Record.create({ id: i, name: 'name-' + i })
  }
  console.log('done')
})