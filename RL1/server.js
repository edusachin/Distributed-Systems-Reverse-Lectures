const express = require('express')
var multer  = require('multer')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/', function (req, res) {
  res.send('Post request successful')
})

port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)

