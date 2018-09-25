import User from './model'
import { notFound, success } from '../../services/response'

export const read = async ({ params }, res, next) =>
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
