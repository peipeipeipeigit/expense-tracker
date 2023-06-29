// basic setting
const express = require('express')
const exphbs = require('express-handlebars') 
const app = express()
const port = 3000

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