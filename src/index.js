const express = require('express')
const app = express()
const http = require('http').Server(app)
const fs = require('fs')

const io = require('socket.io')(http)
const comments = JSON.parse(fs.readFileSync(__dirname + '/comments.json'))
const usernames = JSON.parse(fs.readFileSync(__dirname + '/usernames.json'))
const avatars = JSON.parse(fs.readFileSync(__dirname + '/avatars.json'))

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

const random_integer = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const sendComment = (avatar, username, comment) => {
  io.emit('comment', {"avatar": avatar, "username": username, "comment": comment});
}

const random_comment = () => {
  let timeout = random_integer(1000, 4500)
  let comment = comments[random_integer(0, comments.length)]
  let username = usernames[random_integer(0, usernames.length)]
  let avatar = avatars[random_integer(0, avatars.length)]
  setTimeout(function() {
          sendComment(avatar, username, comment)
          random_comment();
  }, timeout);
}

io.on('connection', (socket) => {
  socket.username = '';
  socket.avatar = '😎';
  socket.on('comment', (comment) => sendComment(socket.avatar, socket.username, comment))
  socket.on('join', (username) => {
    socket.username = username
  });
})

random_comment();

http.listen(3000, () => console.log('Listening on port 3000!'))
