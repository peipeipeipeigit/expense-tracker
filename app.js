// basic setting
const express = require('express')
const exphbs = require('express-handlebars') 
const app = express()
const port = process.env.PORT || 3000

// require to connect database
require('./config/mongoose.js')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting the route
app.get('/', (req, res) => {
  res.send('This is 老爸的私房錢yo')
})

// Listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})