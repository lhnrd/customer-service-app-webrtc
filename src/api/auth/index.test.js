import request from 'supertest'
import { apiRoot } from '../../config'
import { verify } from '../../services/jwt'
import express from '../../services/express'
import { createUser } from '../../../test/fixtures'
import { truncate } from '../../../test/helpers'
import routes from '.'

const app = express(apiRoot, routes)

beforeEach(truncate('users'))

test('POST /auth 201', async () => {
  const email = 'user@sac.com'
  const user = await createUser({ email })
  const { status, body } = await request(app())
    .post(apiRoot)
    .auth(email, '123456')
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(typeof body.token).toBe('string')
  expect(typeof body.user).toBe('object')
  expect(body.user.id).toBe(user.id)
  expect(await verify(body.token)).toBeTruthy()
})

test('POST /auth 400 - invalid email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .auth('invalid', '123456')
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.error).toBeTruthy()
  expect(body.message).toEqual(expect.arrayContaining([expect.stringMatching('email')]))
})

test('POST /auth 400 - invalid password', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .auth('user@sac.com', '123')
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.error).toBeTruthy()
  expect(body.message).toEqual(expect.arrayContaining([expect.stringMatching('password')]))
})

test('POST /auth 401 - user does not exist', async () => {
  const { status } = await request(app())
    .post(apiRoot)
    .auth('notuser@sac.com', '123456')
  expect(status).toBe(401)
})

test('POST /auth 401 - wrong password', async () => {
  await createUser()
  const { status } = await request(app())
    .post(apiRoot)
    .auth('user@sac.com', '654321')
  expect(status).toBe(401)
})

test('POST /auth 401 - missing auth', async () => {
  const { status } = await request(app())
    .post(apiRoot)
  expect(status).toBe(401)
})
