import faker from 'faker'
import User from '../../src/api/users/model'

export default ({
  email = faker.internet.email(),
  name = faker.name.findName(),
  password = '123456',
  role = 'user'
} = {}) =>
  User.query().insert({
    email,
    name,
    password,
    role
  }).returning('*')
