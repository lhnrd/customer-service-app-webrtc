import { compose, Model, snakeCaseMappers } from 'objection'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { timestampPlugin as timestamps } from 'objection-timestamps'

import JoiValidator from './joi-validator'
import events from '../utils/objection-events'

const enhance = compose(guid(), timestamps(), visibility, events)
const validator = new JoiValidator()

class BaseModel extends enhance(Model) {
  static columnNameMappers = snakeCaseMappers()
  static timestamp = true

  static get schema () {
    throw new Error('schema not implemented')
  }

  static createValidator () {
    return validator
  }
}

export default BaseModel
