const merge = require('lodash/merge')
const { AuthenticationError, ForbiddenError, UserInputError } = require('apollo-server')

module.exports = function ({ log = () => {}, preformat = [] } = {}) {
  return err => {
    log(err)

    if (!err.originalError) return err

    const error = preformat.reduce((err, formatter) => {
      try {
        formatter(err)
        return err
      } catch (error) {
        return error
      }
    }, err.originalError)

    err.message = error.message
    err.name = error.name
    switch (error.name) {
      case 'AuthenticationError':
        return merge(err, new AuthenticationError(error.message))
      case 'AuthorizationError':
        return merge(err, new ForbiddenError(error.message))
      case 'ValidationError':
      case 'NotFoundError':
        return merge(err, new UserInputError(error.message, error.errors))
      default:
        console.error(err)
        return err
    }
  }
}
