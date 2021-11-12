const objection = require('objection')
const { ValidationError } = require('@/lib/errors')

function koa () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      errorHandler(err)
      throw err
    }
  }
}

function apollo (err) {
  errorHandler(err)
}

function errorHandler (err) {
  const showExtra = process.env.NODE_ENV !== 'production'

  switch (err.constructor) {
    case objection.UniqueViolationError:
      throw new ValidationError(
        `'${err.columns}' should be unique`,
        showExtra
          ? {
              columns: err.columns,
              table: err.table,
              constraint: err.constraint,
              originalMessage: err.message
            }
          : {}
      )
    case objection.NotNullViolationError:
      throw new ValidationError(
        `'${err.column}' required`,
        showExtra
          ? {
              column: err.column,
              table: err.table,
              originalMessage: err.message
            }
          : {}
      )
    case objection.ForeignKeyViolationError:
      throw new ValidationError(
        `'${err.table}' relations must exist`,
        showExtra
          ? {
              table: err.table,
              constraint: err.constraint,
              originalMessage: err.message
            }
          : {}
      )
  }
  if ([ objection.CheckViolationError, objection.DataError, objection.DBError ].includes(err.constructor)) {
    throw new ValidationError(
      'Database error',
      showExtra
        ? {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint,
            originalMessage: err.message
          }
        : {}
    )
  }
}

module.exports = {
  errorHandler,
  koa,
  apollo
}
