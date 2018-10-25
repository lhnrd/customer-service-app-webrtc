import d from 'debug'
import { FSA, rtcEvents } from '../constants'

const debug = d('socket:manager')
const {
  PEER_CONNECT,
  SIGNAL_SEND
} = rtcEvents

export default io => socket => {
  debug('socket connected')

  socket.on(PEER_CONNECT, (message, ack) => {
    debug(`${PEER_CONNECT} received`)
    const { meta: { room } } = message

    socket.join(room, () => {
      debug(`joined ${room}`)
    })
  })

  socket.on(SIGNAL_SEND, message => {
    debug(`${SIGNAL_SEND} received`)
    const {
      meta: { namespace, room }
    } = message

    debug(`emitting ${FSA} to ${room} and ${namespace}`)

    io.of(namespace).to(room).emit(FSA, message)
  })
}
