import { get } from '../../services/db'
import { success } from '../../services/response'

function Shows () {
  const knexInstance = get()
  return knexInstance('shows')
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
