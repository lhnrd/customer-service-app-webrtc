import User from './model'
import { createUser } from '../../services/db/fixtures'
import { truncate } from '../../../test/helpers'

let data = {
  name: 'Fake name',
  email: 'e@e.com',
  password: '123456',
  role: 'admin'
}

beforeEach(truncate('users'))

describe('[model] User', async () => {
  let user

  beforeAll(async () => {
    user = await createUser(data)
  })

  describe('auth', () => {
    test('hashes password automatically', () => {
      expect(user.password).not.toBe(data.password)
    })

    test('verify returns true if password is correct', async () => {
      expect(await user.verifyPassword(data.password)).toBe(true)
    })

    test('verify returns false if password is wrong', async () => {
      expect(await user.verifyPassword('123')).toBe(false)
    })
  })

  test('throws error if data is invalid', async () => {
    expect.assertions(1)
    try {
      await User.query().insert({ email: '', password: '' })
    } catch (error) {
      expect(error.name).toEqual('ValidationError')
    }
  })
})
