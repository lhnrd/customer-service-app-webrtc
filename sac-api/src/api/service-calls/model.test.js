import ServiceCall from './model'
import { createServiceCall } from '../../services/db/fixtures'
import { truncate } from '../../../test/helpers'

beforeEach(truncate('service_calls'))

describe('[model] ServiceCall', async () => {
  test('inserts if data is valid', async () => {
    const uuid = 'b47a1f3f-9f28-4e28-8c01-c8badcdaab3e'
    const serviceCall = await createServiceCall({ id: uuid })
    const sc = await ServiceCall.query().first().returning('*')
    expect(serviceCall.id).toEqual(sc.id)
  })

  test('throws error if data is invalid', async () => {
    expect.assertions(1)
    try {
      await ServiceCall.query().insert({ duration: 180000, callRatings: '1' })
    } catch (error) {
      expect(error.name).toEqual('ValidationError')
    }
  })
})
