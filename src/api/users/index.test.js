import request from 'supertest'
import { apiRoot, masterKey } from '../../config'
import express from '../../services/express'
import { signSync } from '../../services/jwt'
import routes from '.'
import User from './model'

const app = () => express(apiRoot, routes)

let admin, userOne, userTwo, adminSession, userOneSession, userTwoSession

beforeAll(async () => {
  await User.query().truncate()

  admin = await User.query().insert({
    name: 'Admin',
    email: 'useradmin@email.com',
    password: '123456',
    role: 'admin'
  }).returning('*')
  userOne = await User.query().insert({
    name: 'User one',
    email: 'userone@email.com',
    password: '123456'
  }).returning('*')
  userTwo = await User.query().insert({
    name: 'User two',
    email: 'usertwo@email.com',
    password: '123456'
  }).returning('*')

  adminSession = signSync(admin.id)
  userOneSession = signSync(userOne.id)
  userTwoSession = signSync(userTwo.id)
})

afterAll(async () => {
  await admin && admin.$query().delete()
  await userOne && userOne.$query().delete()
  await userTwo && userTwo.$query().delete()
})

test('GET /users 200 (admin)', async () => {
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

test('GET /users 401 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot)
    .query({ access_token: userOneSession })
  expect(status).toBe(401)
})

test('GET /users 401', async () => {
  const { status } = await request(app())
    .get(apiRoot)
  expect(status).toBe(401)
})

test('GET /users/me 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(apiRoot + '/me')
    .query({ access_token: userOneSession })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.id).toBe(userOne.id)
})

test('GET /users/me 401', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/me')
  expect(status).toBe(401)
})

test('GET /users/:id 200', async () => {
  const response = await request(app())
    .get(`${apiRoot}/${userOne.id}`)
  const { body, headers, status } = response
  expect(status).toBe(200)
  expect(headers['content-type']).toMatch(/json/)
  expect(Array.isArray(body)).toBe(false)
  expect(typeof body).toBe('object')
  expect(body.id).toBe(userOne.id)
})

test('GET /users/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/5a21b571-c60f-4d1c-abfd-23e06900cb2e')
  expect(status).toBe(404)
})

test('POST /users 201 (master)', async () => {
  const email = 'user@email.com'
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email, password: '123456', role: 'user' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(body.email).toBe(email)
})

test('POST /users 201 (master)', async () => {
  const email = 'admin@email.com'
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email, password: '123456', role: 'admin' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(body.email).toBe(email)
})

test('POST /users 409 (master) - duplicated email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'userone@email.com', password: '123456' })
  expect(status).toBe(409)
  expect(typeof body).toBe('object')
  expect(body.errors[0].param).toBe('email')
})

test('POST /users 400 (master) - invalid email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'invalid', password: '123456' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.errors[0].param).toBe('email')
})

test('POST /users 400 (master) - missing email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, password: '123456' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.errors[0].param).toBe('email')
})

test('POST /users 400 (master) - invalid password', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.errors[0].param).toBe('password')
})

test('POST /users 400 (master) - missing password', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.errors[0].param).toBe('password')
})

test('POST /users 400 (master) - invalid role', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123456', role: 'invalid' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.errors[0].param).toBe('role')
})
