import { Router } from 'express'
import { readAll } from './controller'
import { token } from '../../services/passport'

const router = new Router()

/**
 * @api {get} /users Retrieve service calls
 * @apiName RetrieveServiceCalls
 * @apiGroup ServiceCalls
 * @apiPermission admin, user
 * @apiSuccess {Object[]} serviceCalls List of service calls.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  readAll)

export default router
