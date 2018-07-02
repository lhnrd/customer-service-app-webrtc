import User from './model'

let userData = {
  name: 'Fake name',
  email: 'e@e.com',
  password: '123456',
  role: 'admin'
}
let user

beforeAll(async () => {
  await User.query().truncate()
  user = await User.query().insert(userData).returning('*')
})

afterAll(async () => {
  await user && user.$query().delete()
})

describe('/user model', () => {
  describe('auth', () => {
    it('hashes password automatically', () => {
      expect(user.password).not.toBe(userData.password)
    })

    it('verify returns true if password is correct', async () => {
      expect(await user.verifyPassword(userData.password)).toBe(true)
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
