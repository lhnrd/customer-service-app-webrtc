require('babel-core/register') // necessary to execute all imports with ES6 syntax

const Model = require('objection').Model

const users = [
  {
    id: '07895fa3-1376-41a7-9f05-d23378df055b',
    email: 'admin@sac.com',
    name: 'Admin',
    password: '123456',
    role: 'admin'
  },
  {
    id: '28238e7c-dc79-4c40-ae11-64e76aad19da',
    email: 'user1@sac.com',
    name: 'User One',
    password: '123456',
    role: 'user'
  },
  {
    id: '97d4bc19-2bd8-43c1-9fde-54211eecb933',
    email: 'user2@sac.com',
    name: 'User Two',
    password: '123456',
    role: 'user'
  }
]

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
