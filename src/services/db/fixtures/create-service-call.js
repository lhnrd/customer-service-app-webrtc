import faker from 'faker'
import ServiceCall from '../../../api/service-calls/model'

export const createServiceCallDry = ({
  id = faker.random.uuid(),
  description = faker.lorem.sentences(3),
  callRating = faker.random.number(6),
  serviceRating = faker.random.number(6),
  isSolved = faker.random.boolean(),
  startedAt = (new Date()),
  endedAt = (new Date())
} = {}) => ({
  id,
  description,
  callRating,
  serviceRating,
  isSolved,
  startedAt,
  endedAt
})

export const createServiceCallsDry = data =>
  data.map(serviceCall => createServiceCallDry(serviceCall))

export const createServiceCall = data =>
  ServiceCall.query().insert(createServiceCallDry(data)).returning('*')

export const createServiceCalls = data =>
  ServiceCall.query().insert(createServiceCallsDry(data)).returning('*')
