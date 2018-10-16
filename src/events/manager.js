import { FSA } from '../constants'

const broadcastFSA = ({ io, socket }) => message => {
  io.of('/caller').emit(FSA, message)
  socket.broadcast.emit(FSA, message)
}

export default io => socket => {
  console.log('manager connected')
  socket.on(FSA, broadcastFSA({ io, socket }))
}
