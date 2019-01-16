const express = require('express')
const app = express()
const http = require('http').Server(app)
const fs = require('fs')

const io = require('socket.io')(http)
const comments = JSON.parse(fs.readFileSync(__dirname + '/comments.json'))
const usernames = JSON.parse(fs.readFileSync(__dirname + '/usernames.json'))

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

const random_integer = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

let timeout = 1500;
const random_comment = () => {
  let comment = comments[random_integer(0, comments.length)]
  let username = usernames[random_integer(0, usernames.length)]
  timeout = random_integer(1500, 10000)
  io.emit('comment', {"username": username, "comment": comment})
}

io.on('connection', (socket) => {
  socket.username = '';
  socket.on('comment', (comment) => io.emit('comment', {"username": socket.username, "comment": comment}))
  socket.on('join', (username) => {
    socket.username = username
  });
})

setInterval(random_comment, timeout)

http.listen(3000, () => console.log('Listening on port 3000!'))
