const RandomNumber = require('../RandomNumber/index.js')
const fs = require('fs')
const comments = JSON.parse(fs.readFileSync(__dirname + '/json/comments.json'))
const usernames = JSON.parse(fs.readFileSync(__dirname + '/json/usernames.json'))
const avatars = JSON.parse(fs.readFileSync(__dirname + '/json/avatars.json'))

const CommentGenerator = {
    generateRandomComment: function() {
      return {
        avatar: avatars[RandomNumber.randomInteger(0, avatars.length)],
        username: usernames[RandomNumber.randomInteger(0, usernames.length)],
        comment: comments[RandomNumber.randomInteger(0, comments.length)]
      }
    }
}

module.exports = CommentGenerator
