const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('MongoDB error!')
})
// 連線成功
db.once('open', () => {
  console.log('MongoDB connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

// controller
app.get('/', (req, res) => {
  Todo.find()
    .lean() 
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('This app is running on http://localhost:3000')
})