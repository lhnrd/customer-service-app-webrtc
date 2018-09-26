import pick from 'lodash.pick'
import User from './model'
import { notFound, success } from '../../services/response'

const USER_DATA = ['email', 'name', 'password', 'role']

export const create = ({ body }, res, next) =>
  User
    .query()
    .insert(pick(body, USER_DATA))
    .then(success(res, 201))
    .catch(error => {
      if (error.name === 'error' && error.code === '23505') { // database validation error
        res.status(409).json({
          valid: false,
          errors: [
            {
              param: 'email',
              message: '"email" already registered'
            }
          ]
        })
      } else if (error.name === 'ValidationError' && error.isJoi) {
        const errors = error.details.map(e => ({
          param: e.context.key,
          message: e.message
        }))

        res.status(400).json({
          valid: false,
          errors
        })
      } else {
        next(error)
      }
    })

export const read = ({ params }, res, next) =>
  User
    .query()
    .findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const readAll = (req, res, next) =>
  User
    .query()
    .select()
    .then(success(res))
    .catch(next)

export const readMe = ({ user }, res, next) =>
  success(res)(user)

export const update = ({ body, params, user }, res, next) =>
  User
    .query()
    .patch(pick(body, USER_DATA))
    .where('id', params.id === 'me' ? user.id : params.id)
    .returning('*')
    .first()
    .then(notFound(res))
    .then(success(res))
    .catch(next)
