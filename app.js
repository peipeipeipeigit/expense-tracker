// basic setting
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars') 
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require to connect database
require('./config/mongoose.js')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)


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