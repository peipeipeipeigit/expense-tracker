// basic setting
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
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
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// setting the route
app.use(routes)

// Listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})