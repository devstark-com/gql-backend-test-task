const { BaseModel } = require('@/lib/classes/BaseModel')

class TodoList extends BaseModel {
  static schema = {
    ...super.schema,
    title: 'string|required'
    // if field not set in schema it won't be passed to DB
  }
}

module.exports = {
  TodoList
}
