const mongoose = require('mongoose')
const db = mongoose.connection
const Todo = require('../todo')

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('MongoDB error')
})
db.once('open', () => {
  console.log('MongoDB connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}`})
  }
  console.log('done!')
})