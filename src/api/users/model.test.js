import User from './model'

let userData = {
  name: 'Fake name',
  email: 'email@email.com',
  password: '123456',
  role: 'admin'
}
let user

beforeAll(async () => {
  user = await User.query().insert(userData)
})

afterAll(async () => {
  // await user.$query().delete()
})

describe('/user model', () => {
  describe('auth', () => {
    it('hashes password automatically', () => {
      expect(user.password).not.toBe(userData.password)
    })

    it('verify returns true if password is correct', () => {
      expect(user.verifyPassword(userData.password)).toBe(true)
    })

    it('verify returns false if password is wrong', () => {
      expect(user.verifyPassword('123')).toBe(false)
    })
  })

  it.skip('throws error if data is invalid', () => {
    expect(async () => {
      await User.query().insert({ email: '', password: '' })
    }).toThrowError()
  })
})
