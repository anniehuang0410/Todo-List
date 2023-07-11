const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// new
router.get('/new', (req, res) => {
  res.render('new')
})
// add new todos
router.post('/', (req, res) => {
  const userId = req.user._id
  const names = String(req.body.name).split(',').map(todo => ({ name: todo, userId }))
  Todo.insertMany(names)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({_id, userId})
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
// to edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
// edit
router.put('/:id', (req, res) => {
  const { name, isDone } = req.body
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})
// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router