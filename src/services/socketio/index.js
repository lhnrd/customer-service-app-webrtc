import socketio from 'socket.io'

export default (eventsRoot = '', events = f => f) => (composed = {}) => {
  const { server } = composed
  const io = socketio({
    path: eventsRoot,
    serveClient: false
  })
  io.on('connection', events)
  composed.io = server ? io.attach(server) : io
  return composed
}
