import { FSA } from '../../constants'
import ServiceCall from './model'

export default io => {
  ServiceCall.events.on('POST', ({ data }) => {
    io.of('/manager').emit(FSA, {
      type: '@@service-call/ENTITY_CREATE',
      payload: { entity: data }
    })
  })
  ServiceCall.events.on('PUT', ({ data }) => {
    io.of('/manager').emit(FSA, {
      type: '@@service-call/ENTITY_UPDATE',
      payload: { entity: data }
    })
  })
  ServiceCall.events.on('DELETE', ({ data }) => {
    io.of('/manager').emit(FSA, {
      type: '@@service-call/ENTITY_DELETE',
      payload: { entity: data }
    })
  })
}
