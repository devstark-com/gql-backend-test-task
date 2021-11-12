require('dotenv').config()
require('module-alias/register')
require('colors')

if (process.env.NODE_ENV !== 'production') require('@/lib/clean-stack-trace')({ modification: 'remove' })

const koa = require('@/server/koa')
const apollo = require('@/server/graphql')

apollo.applyMiddleware({ app: koa })

koa.listen({ port: process.env.PORT }, async () => {
  const bootTime = new Date()
  const timeString = `${bootTime.getHours()}:${bootTime.getMinutes()}:${bootTime.getSeconds()}:${bootTime.getMilliseconds()}`
  const pidString = `pid: ${process.pid}`

  console.clear()
  console.log(`\nServer ready at ${`http://${process.env.HOST}:${process.env.PORT}`.cyan}`)
  console.log(`GraphQL endpoint: ${`http://${process.env.HOST}:${process.env.PORT}`.cyan}${apollo.graphqlPath.cyan}    ${timeString.gray}    ${pidString.gray}`)
  console.log('================================================='.blue + '================'.yellow + '=============\n'.red)
})
