const scalars = require('graphql-scalars')
const { GraphQLUpload } = require('graphql-upload')

module.exports = {
  DateTime: scalars.DateTimeResolver,
  JSON: scalars.JSONResolver,
  EmailAddress: scalars.EmailAddressResolver,
  PhoneNumber: scalars.PhoneNumberResolver,
  URL: scalars.URLResolver,
  Currency: scalars.CurrencyResolver,
  UnsignedInt: scalars.UnsignedIntResolver,
  PositiveInt: scalars.PositiveIntResolver,
  NonNegativeInt: scalars.NonNegativeIntResolver,
  UnsignedFloat: scalars.UnsignedFloatResolver,
  PositiveFloat: scalars.PositiveFloatResolver,
  NonNegativeFloat: scalars.NonNegativeFloatResolver,
  NonEmptyString: scalars.NonEmptyStringResolver,

  Upload: GraphQLUpload
}
