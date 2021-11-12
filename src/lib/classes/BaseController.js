class BaseController {
  static get Model () {
    return null
  }

  static async findOne (query) {
    return this.Model.query()
      .skipUndefined()
      .findOne(query)
  }

  static async find (query, { skip, limit } = {}) {
    return this.Model.query()
      .skipUndefined()
      .where(query)
      .offset(skip)
      .limit(limit)
  }

  static async count (query) {
    return this.Model.query()
      .skipUndefined()
      .count('*')
      .where(query)
      .then(([{ count }]) => count)
  }

  static async insert (data) {
    return this.Model.query().insert(data).returning('*')
  }

  static async update (id, data) {
    return this.Model.query().findById(id).patch(data).returning('*')
  }

  static async deleteById (id) {
    return this.Model.query().deleteById(id)
  }
}

module.exports = {
  BaseController
}
