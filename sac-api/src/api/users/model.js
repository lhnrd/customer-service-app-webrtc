import Joi from 'joi'
import { compose } from 'objection'
import password from 'objection-password'
import path from 'path'

import BaseModel from '../../common/base-model'

const enhance = compose(password())

export const USER_ROLE_OPTIONS = ['admin', 'user']

export const UserSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  email: Joi.string().email(),
  name: Joi.string().optional(),
  role: Joi.string().valid(USER_ROLE_OPTIONS).optional(),
  password: Joi.string().min(6)
})

class User extends enhance(BaseModel) {
  static get schema () {
    return UserSchema
  }

  static tableName = 'users'

  static relationMappings = {
    serviceCalls: {
      modelClass: path.resolve(__dirname, '../service-calls/model'),
      relation: BaseModel.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'service_calls.userId'
      }
    }
  }
}

export default User
