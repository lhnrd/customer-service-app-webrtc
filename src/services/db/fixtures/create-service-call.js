import faker from 'faker'
import addMinutes from 'date-fns/fp/addMinutes'
import ServiceCall from '../../../api/service-calls/model'

const add30Minutes = addMinutes(30)
const startedAtDate = new Date()

export const createServiceCallDry = ({
  id = faker.random.uuid(),
  description = faker.lorem.sentences(3),
  callRating = faker.random.number(6),
  serviceRating = faker.random.number(6),
  isSolved = faker.random.boolean(),
  startedAt = startedAtDate,
  endedAt = add30Minutes(startedAtDate),
  customerId,
  userId
} = {}) => ({
  id,
  description,
  callRating,
  serviceRating,
  isSolved,
  startedAt,
  endedAt,
  customerId,
  userId
})

export const createServiceCallsDry = data =>
  data.map(serviceCall => createServiceCallDry(serviceCall))

export const createServiceCall = data =>
  ServiceCall.query().insert(createServiceCallDry(data)).returning('*')

export const createServiceCalls = data =>
  ServiceCall.query().insert(createServiceCallsDry(data)).returning('*')
