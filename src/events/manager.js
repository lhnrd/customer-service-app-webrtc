import { FSA } from '../constants'

const broadcastFSA = ({ io, socket }) => message => {
  io.of('/caller').emit(FSA, message)
  socket.broadcast.emit(FSA, message)
}

export default io => socket => {
  socket.on('@@rtc/SEND_SIGNAL', (message, ack) => {
    console.log(message, ack)
  })
}
