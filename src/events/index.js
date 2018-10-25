import callerEvents from './caller'
import managerEvents from './manager'
import registerServiceCallEvents from '../api/service-calls/events'

export default io => {
  io.of('/caller').on('connection', callerEvents(io))
  io.of('/manager').on('connection', managerEvents(io))

  registerServiceCallEvents(io)
}
