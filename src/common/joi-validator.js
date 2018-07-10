import { Validator } from 'objection'
import Joi from 'joi'

class JoiValidator extends Validator {
  validate ({ model, json }) {
    const schema = model.constructor.schema
    const { error: ValidationError, value } = Joi.validate(json, schema)

    if (ValidationError) {
      throw ValidationError
    } else {
      return value
    }
  }
}

export default JoiValidator
