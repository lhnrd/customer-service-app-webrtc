require('babel-core/register') // necessary to execute all imports with ES6 syntax

const Model = require('objection').Model
const createServiceCallsDry = require('../fixtures/create-service-call').createServiceCallsDry

const USER_ID = require('./01_create_users').ID
const CUSTOMER_ID = require('./02_create_customers').ID

const adminServiceCalls = createServiceCallsDry([
  {
    userId: USER_ID.admin,
    customerId: CUSTOMER_ID.customerOne
  },
  {
    userId: USER_ID.admin,
    customerId: CUSTOMER_ID.customerTwo
  },
  {
    userId: USER_ID.admin,
    customerId: CUSTOMER_ID.customerThree
  },
  {
    userId: USER_ID.admin,
    customerId: CUSTOMER_ID.customerOne
  },
  {
    userId: USER_ID.admin,
    customerId: CUSTOMER_ID.customerTwo
  },
  {
    userId: USER_ID.admin,
    customerId: CUSTOMER_ID.customerThree
  }
])
const userOneServicesCalls = createServiceCallsDry([
  {
    userId: USER_ID.userOne,
    customerId: CUSTOMER_ID.customerOne
  },
  {
    userId: USER_ID.userOne,
    customerId: CUSTOMER_ID.customerTwo
  },
  {
    userId: USER_ID.userOne,
    customerId: CUSTOMER_ID.customerThree
  }
])
const serviceCalls = createServiceCallsDry([
  {
    customerId: CUSTOMER_ID.customerThree
  }
])

exports.seed = function (knex, Promise) {
  Model.knex(knex)
  const ServiceCall = require('../../../api/service-calls/model').default
  return ServiceCall
    .query()
    .delete()
    .then(() => {
      return ServiceCall.query().insert([
        ...adminServiceCalls,
        ...userOneServicesCalls,
        ...serviceCalls
      ])
    })
}
