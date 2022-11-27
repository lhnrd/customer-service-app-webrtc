import { buildFilter } from 'objection-filter'
import ServiceCall from './model'
import { error, success } from '../../services/response'

export const readAll = ({ user, query }, res) =>
  buildFilter(ServiceCall)
    .build(JSON.parse(query.filter))
    .where('userId', user.id)
    .orWhere('userId', null)
    .then(success(res, 200))
    .catch(error(res))
