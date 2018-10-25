import createConstants from './utils/create-constants'

export const FSA = '@@socket/FSA'

export const rtcEvents = createConstants('@@rtc/')(
  'PEER_CONNECT',
  'PEER_SET',
  'STREAM_SET',
  'SIGNAL_RECEIVE',
  'SIGNAL_SEND'
)
