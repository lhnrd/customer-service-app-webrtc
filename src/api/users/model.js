import Joi from 'joi'
import { compose } from 'objection'
import password from 'objection-password'

import BaseModel from '../../common/base-model'

const enhance = compose(password())

export const UserSchema = Joi.object({
  id: Joi.string().uuid(),
  email: Joi.string().email().required(),
  name: Joi.string(),
  role: Joi.string().valid(['admin', 'user']),
  password: Joi.string().min(6).required()
})

class User extends enhance(BaseModel) {
  static get schema () {
    return UserSchema
  }

  static get tableName () {
    return 'users'
  }
}

export default User
