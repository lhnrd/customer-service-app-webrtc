import { Server } from 'http'
import fp from 'lodash/fp'
import { env, port, ip, apiRoot, eventsRoot } from './config'
import express from './services/express'
import { init } from './services/db'
import socketio from './services/socketio'
import api from './api'
import events from './events'

init()

// socket.io setup must be the last
const { app, io, server } = fp.pipe(
  express(apiRoot, api),
  socketio(eventsRoot, events)
)({
  server: new Server()
})

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('API and Socket Server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default { app, io, server }
