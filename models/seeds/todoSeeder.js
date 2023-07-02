const mongoose = require('mongoose')
const Todo = require('../todo')

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
  for(let i = 0; i < 10; i++) {
    Todo.create({ name:`name-${i}` })
  }
  console.log('done')
})