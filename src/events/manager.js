import d from 'debug'
import ServiceCall from '../api/service-calls/model'
import { FSA, rtcEvents, serviceCallEvents, socketEvents } from '../constants'

const debug = d('socket:manager')

export const ackSuccess = ack => entity => ack && ack(null, entity)
export const ackError = ack => error => ack && ack(error)

export default io => socket => {
  debug('socket connected')

  // Socket domain events
  socket.on(socketEvents.DISCONNECT, async reason => {
    debug(`socket disconnected ${reason}`)
  })

  socket.on(socketEvents.ERROR, error => {
    debug(`socket error ${error}`)
  })

  // Service call events
  socket.on(serviceCallEvents.ENTITY_UPDATE, ({ data }, ack) =>
    ServiceCall
      .query()
      .patch(data)
      .where('id', data.id)
      .returning('*')
      .then(entity => {
        ackSuccess(ack)(entity)
      })
      .catch(ackError(ack))
  )

  // RTC events
  socket.on(rtcEvents.PEER_CONNECT, (message, ack) => {
    debug(`${rtcEvents.PEER_CONNECT} received`)
    const { meta: { room } } = message

    socket.join(room, () => {
      debug(`joined ${room}`)
    })
  })

  socket.on(rtcEvents.SIGNAL_SEND, message => {
    debug(`${rtcEvents.SIGNAL_SEND} received`)
    const {
      meta: { namespace, room }
    } = message

    debug(`emitting ${FSA} to ${room} and ${namespace}`)

    io.of(namespace).to(room).emit(FSA, message)
  })
}
