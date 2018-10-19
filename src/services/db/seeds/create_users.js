require('babel-core/register') // necessary to execute all imports with ES6 syntax

const Model = require('objection').Model
const createUsersDry = require('../fixtures/create-user').createUsersDry

const users = createUsersDry([
  {
    email: 'admin@sac.com',
    password: '123456',
    role: 'admin'
  },
  {
    email: 'user1@sac.com',
    password: '123456'
  },
  {
    email: 'user2@sac.com',
    password: '123456'
  }
])

exports.seed = function (knex, Promise) {
  Model.knex(knex)
  const User = require('../../../api/users/model').default
  return User
    .query()
    .truncate()
    .then(() => {
      return User.query().insert(users)
    })
}
