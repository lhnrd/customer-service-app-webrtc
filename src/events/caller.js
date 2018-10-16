import { FSA } from '../constants'

const broadcastFSA = ({ io, socket }) => message => {
  io.of('/manager').emit(FSA, message)
  socket.broadcast.emit(FSA, message)
}

export default io => socket => {
  console.log('caller connected')
  socket.on(FSA, broadcastFSA({ io, socket }))
}
