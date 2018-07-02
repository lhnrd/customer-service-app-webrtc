import { compose, Model, snakeCaseMappers } from 'objection'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { timestampPlugin as timestamps } from 'objection-timestamps'

import JoiValidator from './joi-validator'

const enhance = compose(guid(), timestamps(), visibility)
const validator = new JoiValidator()

class BaseModel extends enhance(Model) {
  static createValidator () {
    return validator
  }

  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  static get schema () {
    throw new Error('schema not implemented')
  }
}

export default BaseModel
