import faker from 'faker'
import { transaction } from 'objection'
import Promise from 'bluebird'
import User from '../../src/api/users/model'

export const createUser = ({
  email = faker.internet.email(),
  name = faker.name.findName(),
  password = '123456',
  role = 'user'
} = {}, trx) =>
  User.query(trx).insert({
    email,
    name,
    password,
    role
  }).returning('*')

export const createUsers = async (data) => {
  const knex = User.knex()
  const trx = await transaction.start(knex)
  const users = await Promise.map(data, user => createUser(user, trx))
  await trx.commit()
  return users
}
