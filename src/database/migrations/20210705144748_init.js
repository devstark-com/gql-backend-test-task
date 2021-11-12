exports.up = function (knex) {
  return knex.schema
    .createTable('todo_lists', function (table) {
      table.increments('id')

      table.string('title', 64).notNullable().index().unique()

      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('todo_list')
}
