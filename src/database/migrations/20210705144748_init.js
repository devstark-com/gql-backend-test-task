exports.up = function (knex) {
  return knex.schema
    .createTable('accounts', function (table) {
      table.increments('id')

      table.string('login', 64).notNullable().index().unique()
      table.string('password', 128).notNullable()
      table.string('refresh_token', 128)
      table.string('forgot_hash', 36)
      table.datetime('forgot_expiration')
      table.enum('role', [ 'ADMIN', 'USER' ]).notNullable()

      table.timestamps(true, true)
    })

    .createTable('books', function (table) {
      table.increments('id')

      table.string('title', 128).notNullable()

      table.integer('author_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .index()

      table.timestamps(true, true)
    })

    .createTable('comments', function (table) {
      table.increments('id')

      table.text('text').notNullable()

      table.integer('comment_author_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .notNullable()
        .index()

      table.integer('author_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .index()

      table.integer('book_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .index()

      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('books')
    .dropTableIfExists('accounts')
}
