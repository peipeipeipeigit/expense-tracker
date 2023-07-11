const Record = require('../record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('connect success')
  .then(user => {
  const userId = user._id
  return Promise.all(Array.from(
    { length: 10 },
    (_, i) => Todo.create({ name: `name-${i}`, date: `2023/07/2${i}`, amount: (i+1)*100 })
  ))
})
    .then(() => {
      console.log('done.')
      process.exit()
    })
})