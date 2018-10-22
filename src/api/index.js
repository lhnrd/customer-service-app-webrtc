import { Router } from 'express'
import auth from './auth'
import serviceCalls from './service-calls'
import users from './users'

const router = new Router()
/**
 * // curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
 * // curl -v http://127.0.0.1:3000/?access_token=123456789
 */
/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/auth', auth)
router.use('/service-calls', serviceCalls)
router.use('/users', users)

export default router
