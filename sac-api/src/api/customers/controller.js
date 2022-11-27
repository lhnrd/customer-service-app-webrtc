import pick from 'lodash.pick'
import Customer from './model'
import { error, notFound, success } from '../../services/response'

const CREATE_DATA = ['email', 'name']

export const readAll = (req, res) =>
  Customer
    .query()
    .select()
    .then(success(res, 200))
    .catch(error(res))

export const read = ({ params }, res) =>
  Customer
    .query()
    .findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const create = ({ body }, res, next) =>
  Customer
    .query()
    .insert(pick(body, CREATE_DATA))
    .then(success(res, 201))
    .catch(error(res, next))
