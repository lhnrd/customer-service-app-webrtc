import Peer from 'simple-peer';
import { RSSA } from 'src/constants';
import createConstants from 'src/utils/create-constants';

const createRtcConstants = createConstants('@@rtc/');

export const types = createRtcConstants(
  'PEER_SET',
  'SIGNAL_SEND',
  'SIGNAL_RECEIVE',
  'STREAM_SET'
);

const { PEER_SET, SIGNAL_SEND, SIGNAL_RECEIVE, STREAM_SET } = types;

export const sendSignal = ({ id, signal }) => ({
  [RSSA]: {
    message: {
      type: SIGNAL_SEND,
      payload: signal,
      meta: {
        namespace: '/caller',
        room: id,
      },
    },
  },
});

export const receiveSignal = signal => ({
  type: SIGNAL_RECEIVE,
  payload: signal,
});

export const setPeer = peer => ({
  type: PEER_SET,
  payload: peer,
});

export const setStream = stream => ({
  type: STREAM_SET,
  payload: stream,
});

export const peerConnectTo = ({ id, stream }) => (
  dispatch,
  getState,
  { socket }
) => {
  const peer = new Peer({ stream });

  peer.on('signal', signal => dispatch(sendSignal({ id, signal })));

  socket.on(`${id}`, signal => {
    peer.signal(signal);
  });

  peer.on('connect', () => dispatch(setPeer(peer)));
  peer.on('stream', peerStream => dispatch(setStream(peerStream)));
};
