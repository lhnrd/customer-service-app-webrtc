import User from './model'
import { success } from '../../services/response'

export const readAll = (req, res, next) =>
  User
    .query()
    .select()
    .then(success(res))

export const read = ({ params }, res, next) =>
  User
    .query()
    .where('id', params.id)
    .first()
    .then(success(res))
