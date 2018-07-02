import { compose, Model, snakeCaseMappers } from 'objection'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { timestampPlugin as timestamps } from 'objection-timestamps'

import JoiValidator from './joi-validator'

const enhance = compose(guid(), timestamps(), visibility)
const validator = new JoiValidator()

class BaseModel extends enhance(Model) {
  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  static createValidator () {
    return validator
  }
}

export default BaseModel
