require('dotenv').config({ path: '../../.env' })

module.exports = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
  },
  migrations: {
    tableName: '_migrations',
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
}
