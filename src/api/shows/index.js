import { Router } from 'express'
import { read, readAll } from './controller'

const router = new Router()

router.get('/', readAll)
router.get('/:id', read)

export default router
