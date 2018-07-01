import http from 'http'
import { Model } from 'objection'
import { env, port, ip, apiRoot } from './config'
import express from './services/express'
import { init } from './services/db/knex'
import api from './api'

const knex = init()
Model.knex(knex)

const app = express(apiRoot, api)
const server = http.createServer(app)

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
