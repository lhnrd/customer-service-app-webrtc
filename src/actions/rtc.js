import { RSSA } from 'src/constants';
import createConstants from 'src/utils/create-constants';

const createRtcConstants = createConstants('@@rtc/');

export const types = createRtcConstants(
  'PEER_CONNECT',
  'PEER_SET',
  'STREAM_SET',
  'SIGNAL_RECEIVE',
  'SIGNAL_SEND'
);

const {
  PEER_CONNECT,
  PEER_SET,
  STREAM_SET,
  SIGNAL_RECEIVE,
  SIGNAL_SEND,
} = types;

export const connectPeer = ({ room, stream }) => ({
  [RSSA]: {
    event: PEER_CONNECT,
    message: {
      type: PEER_CONNECT,
      payload: { stream },
      meta: { namespace: '/manager', room },
    },
    optimistic: true,
  },
});

export const sendSignal = ({ room, signal }) => ({
  [RSSA]: {
    event: SIGNAL_SEND,
    message: {
      type: SIGNAL_RECEIVE,
      payload: { signal },
      meta: { namespace: '/manager', room },
    },
  },
});

export const receiveSignal = signal => ({
  type: SIGNAL_RECEIVE,
  payload: { signal },
});

export const setPeer = peer => ({
  type: PEER_SET,
  payload: { peer },
});

export const setStream = stream => ({
  type: STREAM_SET,
  payload: { stream },
});
