import callerEvents from './caller'
import managerEvents from './manager'

export default io => {
  io.of('/caller').on('connection', callerEvents(io))
  io.of('/manager').on('connection', managerEvents(io))
}
