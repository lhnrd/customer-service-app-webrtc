import { compose, Model } from 'objection'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { timestampPlugin as timestamps } from 'objection-timestamps'

import JoiValidator from './joi-validator'

const enhance = compose(guid(), timestamps(), visibility)
const validator = new JoiValidator()

class BaseModel extends enhance(Model) {
  static get schema () {
    throw new Error('schema not implemented')
  }

  static get timestamp () {
    return true
  }

  static createValidator () {
    return validator
  }
}

export default BaseModel
