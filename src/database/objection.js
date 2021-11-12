const { Model, knexSnakeCaseMappers } = require('objection')
const knex = require('knex')({ ...require('./knexfile'), ...knexSnakeCaseMappers() })

Model.knex(knex)

module.exports = {
  Model
}
