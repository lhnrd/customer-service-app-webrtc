import createConstants from './utils/create-constants'

export const FSA = '@@socket-middleware/FSA'

export const events = createConstants()(
  'START_CALL',
  'CANCEL_CALL'
)
