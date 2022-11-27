import { Router } from 'express'
import { create, read, readAll } from './controller'
import { master, token } from '../../services/passport'

const router = new Router()

/**
 * @api {get} /users Retrieve customers
 * @apiName RetrieveCustomers
 * @apiGroup Customer
 * @apiPermission admin
 * @apiSuccess {Object[]} customers List of customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  readAll)

/**
 * @api {get} /users Retrieve customer
 * @apiName RetrieveCustomer
 * @apiGroup Customer
 * @apiPermission admin, user
 * @apiSuccess {Object[]} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id',
  token({ required: true }),
  read)

/**
 * @api {post} / Create customer
 * @apiName CreateCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email Customer's email.
 * @apiParam {String} [name] Customer's name.
 * @apiSuccess (201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiSuccess {Object[]} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/',
  master(),
  create)

export default router
