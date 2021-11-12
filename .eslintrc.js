module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    curly: [ 'warn', 'multi-or-nest' ],
    'arrow-parens': [ 'warn', 'as-needed' ],
    'no-prototype-builtins': 'off',
    'object-curly-spacing': [ 'warn', 'always' ],
    'array-bracket-spacing': [ 'warn', 'always', {
      singleValue: false,
      objectsInArrays: false,
      arraysInArrays: true
    }]
  },
  overrides: [
    {
      files: [ '*.graphql', '*.gql' ],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint']
    }
  ]
}
