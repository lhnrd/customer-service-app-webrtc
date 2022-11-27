import Joi from 'joi'
import path from 'path'

import BaseModel from '../../common/base-model'

export const CustomerSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  email: Joi.string().email(),
  name: Joi.string().optional()
})

class Customer extends BaseModel {
  static get schema () {
    return CustomerSchema
  }

  static tableName = 'customers'

  static relationMappings = {
    serviceCalls: {
      modelClass: path.resolve(__dirname, '../service-calls/model'),
      relation: BaseModel.HasManyRelation,
      join: {
        from: 'customers.id',
        to: 'service_calls.customerId'
      }
    }
  }
}

export default Customer
