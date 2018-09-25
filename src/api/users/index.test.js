import request from 'supertest'
import { apiRoot } from '../../config'
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
    email: 'admin@email.com',
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
