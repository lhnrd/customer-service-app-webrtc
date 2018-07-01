import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes from '.'
import Show from './model'

let show1 = {
  id: 1,
  name: 'Suits',
  channel: 'USA Network',
  genre: 'Drama',
  rating: 3,
  explicit: false
}

let show2 = {
  id: 2,
  name: 'Game of Thrones',
  channel: 'HBO',
  genre: 'Fantasy',
  rating: 5,
  explicit: true
}

let show3 = {
  id: 3,
  name: 'South Park',
  channel: 'Comedy Central',
  genre: 'Comedy',
  rating: 4,
  explicit: true
}

beforeAll(async () => {
  show1 = await Show.query().insert(show1)
  show2 = await Show.query().insert(show2)
  show3 = await Show.query().insert(show3)
})

afterAll(async () => {
  await show1.$query().delete()
  await show2.$query().delete()
  await show3.$query().delete()
})

describe('/shows route', () => {
  const app = () => express(apiRoot, routes)

  it('GET readAll', async () => {
    const response = await request(app())
      .get(apiRoot)
    const { body, headers, status } = response

    expect(status).toBe(200)
    expect(headers['content-type']).toMatch(/json/)
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(3)

    expect(body[0]).toEqual(expect.objectContaining({
      name: expect.any(String),
      channel: expect.any(String),
      genre: expect.any(String),
      rating: expect.any(Number),
      explicit: expect.any(Boolean)
    }))
  })

  it('GET read', async () => {
    const response = await request(app())
      .get(apiRoot + '/1')
    const { body, headers, status } = response

    expect(status).toBe(200)
    expect(headers['content-type']).toMatch(/json/)
    expect(Array.isArray(body)).toBe(false)
    expect(typeof body).toBe('object')

    expect(body).toMatchObject({
      name: 'Suits',
      channel: 'USA Network',
      genre: 'Drama',
      rating: 3,
      explicit: false
    })
  })
})
