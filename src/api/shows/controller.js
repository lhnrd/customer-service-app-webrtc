import knex from '../../services/db/knex'
import { success } from '../../services/response'

function Shows () {
  return knex('shows')
}

export const readAll = (req, res, next) =>
  Shows()
    .select()
    .then(success(res))

export const read = ({ params }, res, next) =>
  Shows()
    .where('id', params.id)
    .first()
    .then(success(res))
