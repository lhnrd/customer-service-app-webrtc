import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes from '.'

describe('shows route', () => {
  const app = () => express(apiRoot, routes)

  it('GET readAll', async () => {
    const response = await request(app())
      .get(apiRoot)
    const { body, headers, status } = response

    expect(status).toBe(200)
    expect(headers['content-type']).toMatch(/json/)
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(4)

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
