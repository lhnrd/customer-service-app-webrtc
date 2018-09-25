import User from './model'
import { createUser } from '../../../test/fixtures'
import { truncate } from '../../../test/helpers'

let data = {
  name: 'Fake name',
  email: 'e@e.com',
  password: '123456',
  role: 'admin'
}

beforeEach(truncate('users'))

describe('/user model', async () => {
  const user = await createUser(data)

  describe('auth', () => {
    it('hashes password automatically', () => {
      expect(user.password).not.toBe(data.password)
    })

    it('verify returns true if password is correct', async () => {
      expect(await user.verifyPassword(data.password)).toBe(true)
    })

    it('verify returns false if password is wrong', async () => {
      expect(await user.verifyPassword('123')).toBe(false)
    })
  })

  it('throws error if data is invalid', async () => {
    expect.assertions(1)
    try {
      await User.query().insert({ email: '', password: '' })
    } catch (error) {
      expect(error.name).toEqual('ValidationError')
    }
  })
})
