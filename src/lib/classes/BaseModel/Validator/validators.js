module.exports = [
  {
    key: 'phone',
    fn: function (value, requirement, attribute) {
      return value.match(/^\+?[1-9]\d{1,14}$/)
    },
    error: 'The :attribute phone number doesn\'t match regexp \'^\+?[1-9]\d{1,14}$\'.' // eslint-disable-line no-useless-escape
  },
  {
    key: 'object',
    fn: function (value, requirement, attribute) {
      return typeof value === 'object'
    },
    error: 'The :attribute must be an object.'
  }
]
