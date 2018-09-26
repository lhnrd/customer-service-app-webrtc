import { Router } from 'express'
import { create, destroy, read, readAll, readMe, update } from './controller'
import { token } from '../../services/passport'

const router = new Router()

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', readAll)
// token({ required: true, roles: ['admin'] }),

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true }),
  readMe)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id', read)

/**
* @api {post} /users Create user
* @apiName CreateUser
* @apiGroup User
* @apiPermission master
* @apiParam {String} access_token Master access_token.
* @apiParam {String} email User's email.
* @apiParam {String} [name] User's name.
* @apiParam {String{6..}} password User's password.
* @apiParam {String="user","admin"} [role=user] User's role.
* @apiSuccess (201) {Object} user User's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 401 Master access only.
* @apiError 409 Email already registered.
*/
router.post('/', create)
// master(),

/**
 * @api {patch} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiSuccess (200) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
*/
router.patch('/:id',
  token({ required: true, roles: ['admin', 'user'] }),
  update)

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
