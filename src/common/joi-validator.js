import { Validator } from 'objection'
import Joi from 'joi'

class JoiValidator extends Validator {
  validate ({ model, json, options: { patch } }) {
    const schema = model.constructor.schema
    const { error: ValidationError, value } = Joi.validate(json, schema, {
      abortEarly: false,
      noDefaults: true,
      presence: patch ? 'optional' : 'required'
    })

    if (ValidationError) {
      throw ValidationError
    } else {
      return value
    }
  }
}

export default JoiValidator
