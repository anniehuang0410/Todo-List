const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(todo => res.render('index', { todo }))
    .catch(error => console.log(error))
})

module.exports = router