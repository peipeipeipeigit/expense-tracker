// basic setting
const express = require('express')
const exphbs = require('express-handlebars') 
const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

// require to connect database
require('./config/mongoose.js')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

// setting the route
app.use(routes)

// Listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})