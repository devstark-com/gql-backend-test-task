const { ApolloServerPluginInlineTrace } = require('apollo-server-core')
const { ApolloServer } = require('apollo-server-koa')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { http: { getTokenFromHeader } } = require('@/lib/utils')
const DBErrorsHandler = require('@/database/error-handler')

module.exports = new ApolloServer({
  uploads: false,
  typeDefs: mergeTypeDefs(loadFilesSync('src/**/*.graphql')),
  resolvers: mergeResolvers(loadFilesSync('src/**/resolvers.js')),
  formatError: require('./error-handler')({ preformat: [DBErrorsHandler.apollo] }),
  plugins: process.env.NODE_ENV === 'development' ? [ApolloServerPluginInlineTrace()] : [],
  tracing: process.env.NODE_ENV === 'development',
  context: ({ ctx }) => ({
    token: getTokenFromHeader(ctx.req.headers.authorization || ''),
    ip: ctx.ip,
    userAgent: ctx.request.headers['user-agent']
  })
})
