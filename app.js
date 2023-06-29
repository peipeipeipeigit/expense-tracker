// basic setting
const express = require('express')
const exphbs = require('express-handlebars') 
const app = express()
const port = process.env.PORT || 3000

// setting and connecting database
const mongoose = require('mongoose') 
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI) 
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting the route
app.get('/', (req, res) => {
  res.send('This is 老爸的私房錢yo')
})

// Listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})