const express = require('express')
const mongoose = require('mongoose')
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('This app is running on http://localhost:3000')
})