const Koa = require('koa')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const bodyParser = require('koa-body')
const { graphqlUploadKoa } = require('graphql-upload')
const errorHandler = require('@/lib/koa/error-handler')
const DBErrorHandler = require('@/database/error-handler')

const app = new Koa()

app
  .use(cors())
  .use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }))
  .use(bodyParser({ jsonLimit: 50 * 1024 * 1024 }))
  .use(graphqlUploadKoa())
  .use(errorHandler())
  .use(DBErrorHandler.koa())

module.exports = app
