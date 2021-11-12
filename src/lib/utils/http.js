const { URL } = require('url')

const isURL = str => {
  try {
    return Boolean(new URL(str))
  } catch (error) {
    return false
  }
}

function getTokenFromHeader (header) {
  return header.replace('Bearer', '').trim()
}

module.exports = {
  getTokenFromHeader,
  isURL
}
