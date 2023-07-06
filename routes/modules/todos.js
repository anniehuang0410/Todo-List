const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// new
router.get('/new', (req, res) => {
  res.render('new')
})
// add new todos
router.post('/', (req, res) => {
  const name = req.body.name
  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
// to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
// edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router