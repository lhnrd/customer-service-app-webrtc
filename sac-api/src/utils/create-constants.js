import snakeCase from 'lodash/fp/snakeCase'
import toUpper from 'lodash/fp/toUpper'
import compose from 'lodash/fp/compose'

const upperSnakeCase = compose(
  toUpper,
  snakeCase
)

export default (prefix = '') => (...keys) =>
  keys.reduce((obj, key) => ({ ...obj, [upperSnakeCase(key)]: prefix + key }), {})
