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
    const action = {
      type: '@@service-call/ENTITY_UPDATE',
      payload: { entity: data }
    }
    io.of('/manager').emit(FSA, action)
    io.of('/caller')
      .to(data.id)
      .emit(FSA, action)
  })
  ServiceCall.events.on('DELETE', ({ data }) => {
    io.of('/manager').emit(FSA, {
      type: '@@service-call/ENTITY_DELETE',
      payload: { entity: data }
    })
  })
}
