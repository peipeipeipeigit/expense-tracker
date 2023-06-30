// basic setting
const express = require('express')
const exphbs = require('express-handlebars') 
const app = express()
const port = process.env.PORT || 3000

// require to connect database
require('./config/mongoose.js')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting the route
app.get('/', (req, res) => {
  res.render('index')
})

// Listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})