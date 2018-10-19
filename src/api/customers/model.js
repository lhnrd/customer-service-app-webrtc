import Joi from 'joi'

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

  static get tableName () {
    return 'customers'
  }
}

export default Customer
