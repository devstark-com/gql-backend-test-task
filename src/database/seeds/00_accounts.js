require('dotenv').config()
require('module-alias/register')
require('colors')
const { AuthController } = require('@/components/auth/controller')
const { enums: { AccountRoles } } = require('@/components/static-data')

exports.seed = function (knex) {
  const registerAccount = async item => {
    return AuthController.register(item)
      .catch(e => {
        console.log(e)
        console.log(e.errors)
      })
  }

  return registerAccount({
    login: 'axis@mail.com',
    password: 'secret',
    role: AccountRoles.ADMIN
  })
}
