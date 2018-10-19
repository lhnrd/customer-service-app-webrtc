require('babel-core/register') // necessary to execute all imports with ES6 syntax

const Model = require('objection').Model
const createCustomersDry = require('../fixtures/create-customer').createCustomersDry

const customers = createCustomersDry([
  {
    email: 'customer1@sac.com'
  },
  {
    email: 'customer2@sac.com'
  },
  {
    email: 'customer3@sac.com'
  }
])

exports.seed = function (knex, Promise) {
  Model.knex(knex)
  const Customer = require('../../../api/customers/model').default
  return Customer
    .query()
    .truncate()
    .then(() => {
      return Customer.query().insert(customers)
    })
}
