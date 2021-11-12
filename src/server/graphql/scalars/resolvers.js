const scalars = require('graphql-scalars')
const { GraphQLUpload } = require('graphql-upload')

module.exports = {
  DateTime: scalars.DateTimeResolver,
  JSON: scalars.JSONResolver,

  Upload: GraphQLUpload
}
