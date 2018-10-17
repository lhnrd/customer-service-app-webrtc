import faker from 'faker'
import User from '../../../api/users/model'

export const createUserDry = ({
  id = faker.random.uuid(),
  email = faker.internet.email(),
  name = faker.name.findName(),
  password = '123456',
  role = 'user'
} = {}) => ({
  id,
  email,
  name,
  password,
  role
})

export const createUsersDry = data => {
  const users = data.map(user => createUserDry(user))
  console.log(users)
  return users
}

export const createUser = data =>
  User.query().insert(createUserDry(data)).returning('*')

export const createUsers = data =>
  User.query().insert(createUsersDry(data)).returning('*')
