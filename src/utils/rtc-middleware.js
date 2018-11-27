import Peer from 'simple-peer';

import {
  disconnectPeer,
  setPeer,
  setStream,
  sendSignal,
  types,
} from 'src/actions/rtc';

const { PEER_CONNECT, PEER_DISCONNECT, SIGNAL_RECEIVE } = types;

const rtcMiddleware = ({ dispatch }) => {
  let peer;

  return next => action => {
    const { meta, payload, type } = action;
    switch (type) {
      case PEER_CONNECT: {
        const { stream } = payload;
        const { room } = meta;

        peer = new Peer({ initiator: false, stream });
        peer.on('signal', signal => {
          dispatch(sendSignal({ room, signal }));
        });

        peer.on('connect', () => dispatch(setPeer(peer)));
        peer.on('stream', peerStream => dispatch(setStream(peerStream)));

        peer.on('close', () => next(disconnectPeer()));
        peer.on('error', err => dispatch(disconnectPeer({ err })));

        break;
      }
      case PEER_DISCONNECT: {
        peer.destroy();
        return;
      }
      case SIGNAL_RECEIVE: {
        const { signal } = payload;
        peer.signal(signal);
        break;
      }
      default:
        break;
    }

    next(action);
  };
};

export default rtcMiddleware;
