import faker from 'faker'
import Customer from '../../../api/customers/model'

export const createCustomerDry = ({
  id = faker.random.uuid(),
  email = faker.internet.email(),
  name = faker.name.findName()
} = {}) => ({
  id, email, name
})

export const createCustomersDry = data =>
  data.map(customer => createCustomerDry(customer))

export const createCustomer = data =>
  Customer.query().insert(createCustomerDry(data)).returning('*')

export const createCustomers = data =>
  Customer.query().insert(createCustomersDry(data)).returning('*')
