import request from 'supertest'
import { apiRoot, masterKey } from '../../config'
import { createUser } from '../../../test/fixtures'
import { truncate } from '../../../test/helpers'
import express from '../../services/express'
import { signSync } from '../../services/jwt'
import routes from '.'

const app = () => express(apiRoot, routes)

beforeEach(truncate('users'))

describe('admin', () => {
  describe('GET', () => {
    test('/users 200', async () => {
      const admin = await createUser({
        name: 'Admin',
        email: 'useradmin@email.com',
        role: 'admin'
      })
      await createUser() // second user
      await createUser() // third user
      const adminSession = signSync(admin.id)
      const { body, headers, status } = await request(app())
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
})

describe('master', () => {
  describe('POST', () => {
    test('POST /users 201', async () => {
      const email = 'user@email.com'
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, email, password: '123456', role: 'user' })
      expect(status).toBe(201)
      expect(typeof body).toBe('object')
      expect(body.email).toBe(email)
    })

    test('POST /users 409 - duplicated email', async () => {
      const email = 'duplicated@email.com'
      await createUser({ email })
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, email, password: '123456' })
      expect(status).toBe(409)
      expect(typeof body).toBe('object')
      expect(body.errors[0].param).toBe('email')
    })

    test('POST /users 400 - invalid email', async () => {
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, email: 'invalid', password: '123456' })
      expect(status).toBe(400)
      expect(typeof body).toBe('object')
      expect(body.errors[0].param).toBe('email')
    })

    test('POST /users 400 - missing email', async () => {
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, password: '123456' })
      expect(status).toBe(400)
      expect(typeof body).toBe('object')
      expect(body.errors[0].param).toBe('email')
    })

    test('POST /users 400 - invalid password', async () => {
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, email: 'd@d.com', password: '123' })
      expect(status).toBe(400)
      expect(typeof body).toBe('object')
      expect(body.errors[0].param).toBe('password')
    })

    test('POST /users 400 - missing password', async () => {
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, email: 'd@d.com' })
      expect(status).toBe(400)
      expect(typeof body).toBe('object')
      expect(body.errors[0].param).toBe('password')
    })

    test('POST /users 400 - invalid role', async () => {
      const { status, body } = await request(app())
        .post(apiRoot)
        .send({ access_token: masterKey, email: 'd@d.com', password: '123456', role: 'invalid' })
      expect(status).toBe(400)
      expect(typeof body).toBe('object')
      expect(body.errors[0].param).toBe('role')
    })
  })
})

describe('unauth', () => {
  describe('GET', () => {
    test('/users 401', async () => {
      const { status } = await request(app())
        .get(apiRoot)
      expect(status).toBe(401)
    })

    test('/users/me 401', async () => {
      const { status } = await request(app())
        .get(apiRoot + '/me')
      expect(status).toBe(401)
    })

    test('/users/:id 200', async () => {
      const user = await createUser()
      const response = await request(app())
        .get(`${apiRoot}/${user.id}`)
      const { body, headers, status } = response

      expect(status).toBe(200)
      expect(headers['content-type']).toMatch(/json/)
      expect(Array.isArray(body)).toBe(false)
      expect(typeof body).toBe('object')
      expect(body.id).toBe(user.id)
    })

    test('/users/:id 404', async () => {
      const { status } = await request(app())
        .get(apiRoot + '/5a21b571-c60f-4d1c-abfd-23e06900cb2e')
      expect(status).toBe(404)
    })
  })
})

describe('user', () => {
  describe('GET', () => {
    test('/users 401', async () => {
      const user = await createUser()
      const userSession = signSync(user.id)
      const { status } = await request(app())
        .get(apiRoot)
        .query({ access_token: userSession })
      expect(status).toBe(401)
    })

    test('/users/me 200', async () => {
      const user = await createUser()
      const userSession = signSync(user.id)
      const { status, body } = await request(app())
        .get(apiRoot + '/me')
        .query({ access_token: userSession })
      expect(status).toBe(200)
      expect(typeof body).toBe('object')
      expect(body.id).toBe(user.id)
    })
  })
})
