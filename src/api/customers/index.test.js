import request from 'supertest'
import { apiRoot, masterKey } from '../../config'
import { createCustomer, createCustomers, createUser } from '../../services/db/fixtures'
import { truncate } from '../../../test/helpers'
import express from '../../services/express'
import { signSync } from '../../services/jwt'
import routes from '.'

const factory = express(apiRoot, routes)

beforeEach(truncate('customers'))

describe('[endpoint] /customers', () => {
  let app

  beforeEach(() => {
    app = factory().app
  })

  describe('admin', () => {
    let admin
    let adminSession

    beforeAll(async () => {
      admin = await createUser({ role: 'admin' })
      adminSession = signSync(admin.id)
    })

    describe('GET', () => {
      test('/ 200', async () => {
        await createCustomers([{}, {}])

        const { body, status } = await request(app)
          .get(apiRoot)
          .query({ access_token: adminSession })

        expect(status).toBe(200)
        expect(body.length).toBe(2)
      })

      test('/:id 200', async () => {
        const customer = await createCustomer({ email: 'customer@sac.com' })
        const { body, headers, status } = await request(app)
          .get(`${apiRoot}/${customer.id}`)
          .query({ access_token: adminSession })

        expect(status).toBe(200)
        expect(headers['content-type']).toMatch(/json/)
        expect(Array.isArray(body)).toBe(false)
        expect(typeof body).toBe('object')
        expect(body.id).toBe(customer.id)
      })
    })
  })

  describe('master', () => {
    describe('POST', () => {
      test('/ 201', async () => {
        const customer = { email: 'customer@email.com' }
        const { body, status } = await request(app)
          .post(apiRoot)
          .send(customer)
          .query({ access_token: masterKey })

        expect(status).toBe(201)
        expect(typeof body).toBe('object')
        expect(body.email).toBe(customer.email)
      })
    })
  })
})
