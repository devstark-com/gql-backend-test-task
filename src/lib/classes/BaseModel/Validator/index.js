const { pick, cloneDeep: clone, merge } = require('lodash')
const Validatorjs = require('validatorjs')
const { Validator } = require('objection')
const { ValidationError } = require('@/lib/errors')
const validators = require('./validators')

validators.forEach(v => Validatorjs.register(v.key, v.fn, v.error))

class CustomModelValidator extends Validator {
  validate ({ json, model, options: { patch } }) {
    let schema = clone(model.constructor.schema)
    if (patch || json[this.idColumn]) schema = pick(schema, Object.keys(json))

    if (!patch) {
      let defaults = model.constructor.defaults
      if (typeof model.constructor.defaults === 'function') defaults = model.constructor.defaults(json)
      json = merge(clone(defaults), json)
    }

    const validation = new Validatorjs(json, schema)
    if (validation.fails()) throw new ValidationError(`${model.constructor.modelName} validation failed`, validation.errors.errors)

    return json
  }

  beforeValidate (args) {
    return super.beforeValidate(args)
  }

  afterValidate (args) {
    return super.afterValidate(args)
  }
}

module.exports = {
  CustomModelValidator,
  Validatorjs
}
