/*
* For the serverside application I used express.js for requests
* and socket.io for real-time comments
* Serverside comments are generated through a random comment picker function
* it generates a random number within a given range and picks
* comments usernames and avatars from JSON arrays.
* The server then sends a random generated comment to the frontend
* via socket.io 'comment' event at random generated time intervals.
* The user can login and send comments via socket.io events 'join' and 'comment'
*/
const express = require('express')
const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http)
const cg = require('./components/CommentGenerator/')
const rn = require('./components/RandomNumber')

app.use('/style', express.static(__dirname + '/style'))
app.use('/images', express.static(__dirname + '/images'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

const sendComment = (comment) => {
  io.emit('comment', comment);
}

const sendRandomComment = () => {
  let timeout = rn.randomInteger(1000, 4500)
  setTimeout(function() {
          sendComment(cg.generateRandomComment())
          sendRandomComment();
  }, timeout);
}

io.on('connection', (socket) => {
  socket.username = '';
  socket.avatar = '😎';
  socket.on('comment', (comment) => sendComment(
    {
      avatar: socket.avatar,
      username: socket.username,
      comment: comment
    })
  )
  socket.on('join', (username) => {
    socket.username = username
  });
})

sendRandomComment();

http.listen(3000, () => console.log('Listening on port 3000!'))
