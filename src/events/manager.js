import { FSA } from '../constants'
import ServiceCall from '../api/service-calls/model'

const broadcastFSA = ({ io, socket }) => message => {
  io.of('/caller').emit(FSA, message)
  socket.broadcast.emit(FSA, message)
}

export default io => socket => {
  ServiceCall.events.on('POST', ({ data }) => {
    socket.broadcast.emit(FSA, {
      type: '@@service-call/POST',
      payload: data
    })
  })
  ServiceCall.events.on('PUT', ({ data }) => {
    socket.broadcast.emit(FSA, {
      type: '@@service-call/PUT',
      payload: data
    })
  })
  socket.on(FSA, broadcastFSA({ io, socket }))
}
