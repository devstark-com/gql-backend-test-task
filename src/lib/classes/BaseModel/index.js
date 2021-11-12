const { camelCase, pick } = require('lodash')
const pluralize = require('pluralize')
const { Model } = require('@/database/objection')
const { CustomModelValidator, Validatorjs } = require('./Validator')

class BaseModel extends Model {
  static idColumn = 'id'

  static get tableName () {
    return pluralize(camelCase(this.modelName))
  }

  static get modelName () {
    return this.name.replace(/Model|Controller/g, '')
  }

  static Validate = Validatorjs
  static createValidator () {
    return new CustomModelValidator()
  }

  $beforeInsert () {
    const now = new Date().toISOString()
    this.createdAt = now
    this.updatedAt = now
  }

  $beforeUpdate () {
    this.updatedAt = new Date().toISOString()
  }

  $parseJson (json, opt) {
    json = super.$parseJson(json, opt)
    return pick(json, [
      ...Object.keys(this.constructor.schema),
      ...Object.keys(this.constructor.relationMappings || {})
    ])
  }

  async fetchRelated (field) {
    return this.$modelClass.query()
      .withGraphJoined(field)
      .findById(this.id)
      .then(res => res[field])
  }

  static schema = {
    id: 'integer',
    createdAt: 'date',
    updatedAt: 'date'
  }

  static defaults = {}
}

module.exports = {
  BaseModel
}
