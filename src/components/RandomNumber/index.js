const RandomNumber = {
  randomInteger: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
module.exports = RandomNumber
