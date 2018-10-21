require('babel-core/register') // necessary to execute all imports with ES6 syntax

const Model = require('objection').Model
const createUsersDry = require('../fixtures/create-user').createUsersDry

const ID = {
  admin: '656f3c98-0051-491c-80f4-03b9aef47042',
  userOne: '961e8a22-3399-442f-8430-e9e0bb2aad64',
  userTwo: '1b2d29fa-1205-4199-b7bc-cda352479ac8'
}

const users = createUsersDry([
  {
    id: ID.admin,
    email: 'admin@sac.com',
    password: '123456',
    role: 'admin'
  },
  {
    id: ID.userOne,
    email: 'user1@sac.com',
    password: '123456'
  },
  {
    id: ID.userTwo,
    email: 'user2@sac.com',
    password: '123456'
  }
])

exports.ID = ID
exports.seed = function (knex, Promise) {
  Model.knex(knex)
  const User = require('../../../api/users/model').default
  return User
    .query()
    .delete()
    .then(() => {
      return User.query().insert(users)
    })
}
