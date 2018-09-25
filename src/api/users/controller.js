import User from './model'
import { notFound, success } from '../../services/response'

const createUser = body => ({
  email: body.email,
  password: body.password,
  role: body.role
})

export const create = ({ body }, res, next) =>
  User
    .query()
    .insert(createUser(body))
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
