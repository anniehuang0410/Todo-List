const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Todo = require('./models/todo')
const routes = require('./routes')
const app = express()

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('This app is listening on http://localhost:3000')
})