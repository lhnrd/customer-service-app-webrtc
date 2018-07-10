import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes from '.'
import User from './model'

let user = {
  name: 'Fake name',
  email: 'e@e.com',
  password: '123456',
  role: 'admin'
}

beforeAll(async () => {
  await User.query().truncate()
  await User.query().insert(user).returning('*')
  user = await User.query().select().first()
})

afterAll(async () => {
  await user && user.$query().delete()
})

describe('/users route', () => {
  const app = () => express(apiRoot, routes)

  it('GET readAll', async () => {
    const response = await request(app())
      .get(apiRoot)
    const { body, headers, status } = response

    expect(status).toBe(200)
    expect(headers['content-type']).toMatch(/json/)
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(1)

    expect(body[0]).toEqual(expect.objectContaining({
      email: expect.any(String),
      name: expect.any(String),
      role: expect.any(String),
      password: expect.any(String)
    }))
  })

  it('GET read', async () => {
    const response = await request(app())
      .get(`${apiRoot}/${user.id}`)
    const { body, headers, status } = response
    expect(status).toBe(200)
    expect(headers['content-type']).toMatch(/json/)
    expect(Array.isArray(body)).toBe(false)
    expect(typeof body).toBe('object')
  })
})
