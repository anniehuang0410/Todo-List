const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
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

// index
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todo => res.render('index', { todo }))
    .catch(error => console.log(error))
})
// new
app.get('/todos/new', (req, res) => {
  res.render('new')
})
// add new todos
app.post('/todos', (req, res) => {
  const name = req.body.name
  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id 
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
// to edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
// edit
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('This app is listening on http://localhost:3000')
})