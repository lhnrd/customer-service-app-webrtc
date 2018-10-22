import JoiBase from 'joi'
import JoiDate from 'joi-date-extensions'
import path from 'path'

import BaseModel from '../../common/base-model'

const Joi = JoiBase.extend(JoiDate)

export const ServiceCallSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  description: Joi.string(),

  // call timeline
  startedAt: Joi.date().optional(),
  endedAt: Joi.date().optional(),
  duration: Joi.number().integer().forbidden(),

  // call ratings
  callRating: Joi.number().integer().min(0).max(6).optional(),
  serviceRating: Joi.number().integer().min(0).max(6).optional(),
  isSolved: Joi.boolean().optional(),

  // relations
  customerId: Joi.string().uuid().optional(),
  userId: Joi.string().uuid().optional()
})

class ServiceCall extends BaseModel {
  static get schema () {
    return ServiceCallSchema
  }

  static enableEvents = true
  static tableName = 'service_calls'

  static relationMappings = {
    customer: {
      modelClass: path.resolve(__dirname, '../customers/model'),
      relation: BaseModel.BelongsToOneRelation,
      join: {
        from: 'service_calls.customerId',
        to: 'customers.id'
      }
    },
    user: {
      modelClass: path.resolve(__dirname, '../users/model'),
      relation: BaseModel.BelongsToOneRelation,
      join: {
        from: 'service_calls.userId',
        to: 'users.id'
      }
    }
  }
}

export default ServiceCall
