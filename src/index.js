const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

const random_comment = () => {
  io.emit('comment', 'a not-random comment')
}

io.on('connection', (socket) => {
  socket.on('comment', (comment) => io.emit('comment', comment))
})

setInterval(random_comment, 1500)

http.listen(3000, () => console.log('Listening on port 3000!'))
