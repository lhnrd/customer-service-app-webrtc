import request from 'supertest'
import { apiRoot, masterKey } from '../../config'
import { createUser, createUsers } from '../../../test/fixtures'
import { truncate } from '../../../test/helpers'
import express from '../../services/express'
import { signSync } from '../../services/jwt'
import User from './model'
import routes from '.'

const factory = express(apiRoot, routes)

beforeEach(truncate('users'))

describe('[endpoint] /users', () => {
  describe('admin', () => {
    describe('DELETE', () => {
      test('/:id 200', async () => {
        const email = 'user@email.com'
        const [admin, user] = await createUsers([
          {
            name: 'Admin',
            email: 'useradmin@email.com',
            role: 'admin'
          },
          {
            email
          }
        ])
        const adminSession = signSync(admin.id)
        const { status, body } = await request(factory().app)
          .delete(`${apiRoot}/${user.id}`)
          .send({ access_token: adminSession })

        expect(status).toBe(200)
        expect(body.email).toEqual(email)
      })

      test('/:id 404', async () => {
        const admin = await createUser({ role: 'admin' })
        const adminSession = signSync(admin.id)
        const { status } = await request(factory().app)
          .delete(apiRoot + '/5a21b571-c60f-4d1c-abfd-23e06900cb2e')
          .send({ access_token: adminSession })

        expect(status).toBe(404)
      })
    })

    describe('GET', () => {
      test('/ 200', async () => {
        const [admin] = await createUsers([
          {
            name: 'Admin',
            email: 'useradmin@email.com',
            role: 'admin'
          },
          {},
          {}
        ])
        const adminSession = signSync(admin.id)
        const { body, headers, status } = await request(factory().app)
          .get(apiRoot)
          .query({ access_token: adminSession })

        expect(status).toBe(200)
        expect(headers['content-type']).toMatch(/json/)
        expect(Array.isArray(body)).toBe(true)
        expect(body.length).toBe(3)

        expect(body[0]).toEqual(expect.objectContaining({
          email: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
          password: expect.any(String)
        }))
      })
    })

    describe('PATCH', () => {
      test('/:id 200', async () => {
        const admin = await createUser({ role: 'admin' })
        const user = await createUser({ name: 'othername' })
        const adminSession = signSync(admin.id)

        const { status, body } = await request(factory().app)
          .patch(`${apiRoot}/${user.id}`)
          .send({ access_token: adminSession, name: 'test' })

        expect(status).toBe(200)
        expect(typeof body).toBe('object')
        expect(body.name).toBe('test')
      })

      test('/:id 404', async () => {
        const admin = await createUser({ role: 'admin' })
        const adminSession = signSync(admin.id)
        const { status } = await request(factory().app)
          .patch(apiRoot + '/5a21b571-c60f-4d1c-abfd-23e06900cb2e')
          .send({ access_token: adminSession, name: 'test' })

        expect(status).toBe(404)
      })
    })
  })

  describe('master', () => {
    describe('POST', () => {
      test('/ 201', async () => {
        const email = 'user@email.com'
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, email, password: '123456', role: 'user' })

        expect(status).toBe(201)
        expect(typeof body).toBe('object')
        expect(body.email).toBe(email)
      })

      test('/ 409 - duplicated email', async () => {
        const email = 'duplicated@email.com'
        await createUser({ email })
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, email, password: '123456' })
        expect(status).toBe(409)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('email')
      })

      test('/ 400 - invalid email', async () => {
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, email: 'invalid', password: '123456' })
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('email')
      })

      test('/ 400 - missing email', async () => {
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, password: '123456' })
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('email')
      })

      test('/ 400 - invalid password', async () => {
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, email: 'd@d.com', password: '123' })
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('password')
      })

      test('/ 400 - missing password', async () => {
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, email: 'd@d.com' })
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('password')
      })

      test('/ 400 - invalid role', async () => {
        const { status, body } = await request(factory().app)
          .post(apiRoot)
          .send({ access_token: masterKey, email: 'd@d.com', password: '123456', role: 'invalid' })
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('role')
      })
    })
  })

  describe('unauth', () => {
    describe('DELETE', () => {
      test('/:id 401', async () => {
        const user = await createUser()
        const { status } = await request(factory().app)
          .delete(`${apiRoot}/${user.id}`)
        expect(status).toBe(401)
      })
    })

    describe('GET', () => {
      test('/ 401', async () => {
        const { status } = await request(factory().app)
          .get(apiRoot)
        expect(status).toBe(401)
      })

      test('/me 401', async () => {
        const { status } = await request(factory().app)
          .get(apiRoot + '/me')
        expect(status).toBe(401)
      })

      test('/:id 200', async () => {
        const user = await createUser()
        const response = await request(factory().app)
          .get(`${apiRoot}/${user.id}`)
        const { body, headers, status } = response

        expect(status).toBe(200)
        expect(headers['content-type']).toMatch(/json/)
        expect(Array.isArray(body)).toBe(false)
        expect(typeof body).toBe('object')
        expect(body.id).toBe(user.id)
      })

      test('/:id 404', async () => {
        const { status } = await request(factory().app)
          .get(apiRoot + '/5a21b571-c60f-4d1c-abfd-23e06900cb2e')
        expect(status).toBe(404)
      })
    })

    describe('PATCH', () => {
      test('/me 401', async () => {
        const { status } = await request(factory().app)
          .patch(apiRoot + '/me')
          .send({ name: 'test' })
        expect(status).toBe(401)
      })

      test('/:id 401', async () => {
        const user = await createUser()
        const { status } = await request(factory().app)
          .patch(`${apiRoot}/${user.id}`)
          .send({ name: 'test' })
        expect(status).toBe(401)
      })
    })
  })

  describe('user', () => {
    describe('DELETE', () => {
      test('/:id 401', async () => {
        const user = await createUser()
        const userSession = signSync(user.id)
        const { status } = await request(factory().app)
          .delete(`${apiRoot}/${user.id}`)
          .send({ access_token: userSession })
        expect(status).toBe(401)
      })
    })

    describe('GET', () => {
      test('/ 401', async () => {
        const user = await createUser()
        const userSession = signSync(user.id)
        const { status } = await request(factory().app)
          .get(apiRoot)
          .query({ access_token: userSession })
        expect(status).toBe(401)
      })

      test('/me 200', async () => {
        const user = await createUser()
        const userSession = signSync(user.id)
        const { status, body } = await request(factory().app)
          .get(apiRoot + '/me')
          .query({ access_token: userSession })
        expect(status).toBe(200)
        expect(typeof body).toBe('object')
        expect(body.id).toBe(user.id)
      })
    })

    describe('PATCH', () => {
      test('/me 200', async () => {
        const user = await createUser()
        const userSession = signSync(user.id)

        expect(user.email).not.toBe('test@test.com')
        expect(user.name).not.toBe('test')

        const { status, body } = await request(factory().app)
          .patch(apiRoot + '/me')
          .send({ access_token: userSession, email: 'test@test.com', name: 'test' })

        expect(status).toBe(200)
        expect(typeof body).toBe('object')
        expect(body.email).toBe('test@test.com')
        expect(body.name).toBe('test')
      })

      test('/:id 200', async () => {
        const user = await createUser()
        const userSession = signSync(user.id)

        expect(user.email).not.toBe('test@test.com')
        expect(user.name).not.toBe('test')

        const { status, body } = await request(factory().app)
          .patch(`${apiRoot}/${user.id}`)
          .send({ access_token: userSession, email: 'test@test.com', name: 'test' })
        expect(status).toBe(200)
        expect(typeof body).toBe('object')
        expect(body.email).toBe('test@test.com')
        expect(body.name).toBe('test')
      })

      test('/:id 401 - another user', async () => {
        const userOne = await createUser({ name: 'userone' })
        const userTwo = await createUser({ name: 'usertwo' })
        const userOneSession = signSync(userOne.id)

        const { status } = await request(factory().app)
          .patch(`${apiRoot}/${userTwo.id}`)
          .send({ access_token: userOneSession, name: 'test' })
        expect(status).toBe(401)
      })

      const verifyPassword = async (password, userId) => {
        const user = await User.query().findById(userId)
        return user.verifyPassword(password)
      }

      test('/:id/password 200', async () => {
        const email = 'user@email.com'
        const user = await createUser({
          email,
          password: '123456'
        })
        const userSession = signSync(user.id)
        const { status, body } = await request(factory().app)
          .put(`${apiRoot}/${user.id}/password`)
          .send({ access_token: userSession, password: '654321' })

        expect(status).toBe(200)
        expect(typeof body).toBe('object')
        expect(body.email).toBe(email)
        expect(await verifyPassword('654321', body.id)).toBe(true)
      })

      test('/:id/password 400 - invalid password', async () => {
        const email = 'user@email.com'
        const user = await createUser({
          email,
          password: '123456'
        })
        const userSession = signSync(user.id)
        const { status, body } = await request(factory().app)
          .put(`${apiRoot}/${user.id}/password`)
          .send({ access_token: userSession, password: '321' })

        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.errors[0].param).toBe('password')
      })

      test('/:id/password 401 - invalid authentication method', async () => {
        const email = 'user@email.com'
        const password = '123456'
        const user = await createUser({
          email,
          password
        })
        const { status } = await request(factory().app)
          .put(`${apiRoot}/${user.id}/password`)
          .auth(email, password)
          .send({ password: '654321' })

        expect(status).toBe(401)
      })

      test('/:id/password 401 - another user', async () => {
        const userOne = await createUser()
        const userTwo = await createUser()
        const userOneSession = signSync(userOne.id)
        const { status } = await request(factory().app)
          .put(`${apiRoot}/${userTwo.id}/password`)
          .send({ access_token: userOneSession, password: '654321' })

        expect(status).toBe(401)
      })
    })
  })
})
