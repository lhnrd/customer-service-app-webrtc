import ServiceCall from './model'
import { error, success } from '../../services/response'

export const readAll = ({ user }, res) =>
  user.role === 'admin' ? (
    ServiceCall
      .query()
      .select()
      .then(success(res, 200))
      .catch(error(res))
  ) : (
    ServiceCall
      .query()
      .where('userId', user.id)
      .then(success(res, 200))
      .catch(error(res))
  )
