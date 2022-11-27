import pick from 'lodash.pick'
import User from './model'
import { error, notFound, success } from '../../services/response'

const CREATE_DATA = ['email', 'name', 'password', 'role']
const UPDATE_DATA = ['email', 'name', 'role']

export const create = ({ body }, res, next) =>
  User
    .query()
    .insert(pick(body, CREATE_DATA))
    .then(success(res, 201))
    .catch(error(res, next))

export const read = ({ params }, res, next) =>
  User
    .query()
    .findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const readAll = (req, res, next) =>
  User
    .query()
    .select()
    .then(success(res))
    .catch(error(res))

export const readMe = ({ user }, res, next) =>
  success(res)(user)

export const update = ({ body, params, user }, res, next) => {
  const userId = params.id === 'me' ? user.id : params.id
  const isAdmin = user.role === 'admin'
  const isCurrentUser = userId === user.id

  if (isAdmin || isCurrentUser) {
    return User
      .query()
      .patch(pick(body, UPDATE_DATA))
      .where('id', userId)
      .returning('*')
      .first()
      .then(notFound(res))
      .then(success(res))
      .catch(error(res))
  }
  return res.status(401).json({
    message: 'You can\'t change other user\'s data',
    valid: false
  })
}

export const updatePassword = ({ body, params, user }, res, next) => {
  const userId = params.id === 'me' ? user.id : params.id
  const isCurrentUser = userId === user.id

  if (isCurrentUser) {
    return User
      .query()
      .patch(pick(body, ['password']))
      .where('id', userId)
      .returning('*')
      .first()
      .then(notFound(res))
      .then(success(res))
      .catch(error(res))
  }
  return res.status(401).json({
    valid: false,
    param: 'password',
    message: 'You can\'t change other user\'s password'
  })
}

export const destroy = ({ params }, res, next) =>
  User
    .query()
    .delete()
    .where('id', params.id)
    .returning('*')
    .first()
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))
