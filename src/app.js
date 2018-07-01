import http from 'http'
import { env, port, ip, apiRoot } from './config'
import express from './services/express'
import { init } from './services/db'
import api from './api'

init()

const app = express(apiRoot, api)
const server = http.createServer(app)

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
