const { BookController } = require('../controller')
const { NotFoundError } = require('@/lib/errors')

class BookResolver {
  static resolvers () {
    return {
      Query: {
        book: async (_, { where }, { account }) => {
          const book = await BookController.opencrud.findOne(where)
          if (!book) throw new NotFoundError('Book not found')

          return book
        },
        books: async (_, { where, orderBy, skip, limit }, { account }) => {
          return {
            totalCount: await BookController.opencrud.count(where),
            list: await BookController.opencrud.find(where, { orderBy, skip, limit })
          }
        }
      },
      Mutation: {
        createBook: async (_, { data, authorId }, { account }) => BookController.insert({ ...data, authorId }),
        updateBook: (_, { id, data }, { account }) => BookController.update(id, data),
        deleteBook: (_, { id }, { account }) => BookController.deleteById(id).then(() => true)
      },
      Book: {
        // author: (parent, _, ctx) => this.dataLoaders(ctx, 'author', AuthController).load(parent.authorId),
        // comments: (parent, _, ctx) => this.dataLoaders(ctx, 'comments', CommentController, { multi: true, field: 'bookId' }).load(parent.id)
      }
    }
  }
}

module.exports = BookResolver.resolvers()
