const { Book } = require('@/entities/book')

class BookController {
  static async find (query) {
    return Book.query().skipUndefined().where(query)
  }

  static async insert (data) {
    return Book.query().insert(data).returning('*')
  }

  static async update (id, data) {
    return Book.query().findById(id).patch(data).returning('*')
  }

  static async deleteById (id) {
    return Book.query().deleteById(id)
  }

  static opencrud = {
    find: async (query, { orderBy, skip, limit } = {}) => {
      return Book.query()
        .skipUndefined()
        .where(Book.opencrud.buildWhere(query))
        .orderBy(Book.opencrud.parseOrderBy(orderBy))
        .offset(skip)
        .limit(limit)
    },

    count: async query => {
      return Book.query()
        .where(Book.opencrud.buildWhere(query))
        .count('id')
        .then(([{ count }]) => count)
    },

    findOne: async query => {
      return Book.query()
        .findOne(Book.opencrud.buildWhere(query))
    }
  }
}

module.exports = {
  BookController
}
