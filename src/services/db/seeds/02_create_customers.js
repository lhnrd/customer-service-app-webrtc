require('babel-core/register') // necessary to execute all imports with ES6 syntax

const Model = require('objection').Model
const createCustomersDry = require('../fixtures/create-customer').createCustomersDry

const ID = {
  customerOne: '0003736f-3ac6-4695-bf3e-309bf1d895ee',
  customerTwo: '51daa685-5016-4f75-ba0b-1b07f1b3009f',
  customerThree: '5675f188-53c7-4321-adbd-3f604077120d'
}

const customers = createCustomersDry([
  {
    id: ID.customerOne,
    email: 'customer1@sac.com'
  },
  {
    id: ID.customerTwo,
    email: 'customer2@sac.com'
  },
  {
    id: ID.customerThree,
    email: 'customer3@sac.com'
  }
])

exports.ID = ID
exports.seed = function (knex, Promise) {
  Model.knex(knex)
  const Customer = require('../../../api/customers/model').default
  return Customer
    .query()
    .delete()
    .then(() => {
      return Customer.query().insert(customers)
    })
}
