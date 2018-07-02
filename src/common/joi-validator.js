import { Validator } from 'objection'
import Joi from 'joi'

class JoiValidator extends Validator {
  validate ({ model, json }) {
    const schema = model.constructor.schema
    const validation = Joi.validate(json, schema)

    if (validation.error) {
      const { error: ValidationError } = validation
      throw ValidationError
    } else {
      return json
    }
  }
}

export default JoiValidator
