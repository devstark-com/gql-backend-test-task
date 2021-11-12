const { BaseModel } = require('@/lib/classes/BaseModel')

class BookModel extends BaseModel {
  static get relationMappings () {
    return {
      author: {
        relation: this.BelongsToOneRelation,
        modelClass: require('@/entities/account'),
        join: {
          from: 'books.authorId',
          to: 'accounts.id'
        }
      },
      comment: {
        relation: this.HasManyRelation,
        modelClass: require('@/entities/comment'),
        join: {
          from: 'books.id',
          to: 'comment.bookId'
        }
      }
    }
  }

  static schema = {
    ...super.schema,
    title: 'string|required',
    authorId: 'integer|required'
  }
}

module.exports = {
  BookModel
}
