import { FSA } from '../../constants'
import ServiceCall from './model'

export default io => {
  ServiceCall.events.on('POST', ({ data }) => {
    io.of('/manager').emit(FSA, {
      type: '@@service-call/CREATE_ENTITY_SUCCESS',
      payload: data
    })
  })
  ServiceCall.events.on('PUT', ({ data }) => {
    io.of('/manager').emit(FSA, {
      type: '@@service-call/UPDATE_ENTITY_SUCCESS',
      payload: data
    })
  })
}
