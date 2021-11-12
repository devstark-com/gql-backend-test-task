function delay (ms) {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}

module.exports = {
  calc: require('./calc'),
  http: require('./http'),
  delay
}
