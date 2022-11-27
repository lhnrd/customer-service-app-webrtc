import Customer from './model'
import { createCustomer } from '../../services/db/fixtures'
import { truncate } from '../../../test/helpers'

beforeEach(truncate('customers'))

describe('[model] Customer', async () => {
  test('inserts if data is valid', async () => {
    const customer = await createCustomer({
      name: 'Fake name',
      email: 'e@e.com'
    })
    const c = await Customer.query().first().returning('*')
    expect(customer.email).toEqual(c.email)
  })

  test('throws error if data is invalid', async () => {
    expect.assertions(1)
    try {
      await Customer.query().insert({ email: '', password: '' })
    } catch (error) {
      expect(error.name).toEqual('ValidationError')
    }
  })
})
