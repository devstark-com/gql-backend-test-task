const { TodoList } = require('@/entities/TodoList')
const { BaseController } = require('@/lib/classes/BaseController')

class TodoListController extends BaseController {
  static get Model () {
    return TodoList
  }
}

module.exports = {
  TodoListController
}
