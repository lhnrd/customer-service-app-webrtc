import Peer from 'simple-peer';

import { setPeer, setStream, sendSignal, types } from 'src/actions/rtc';

const { PEER_CONNECT, SIGNAL_RECEIVE } = types;

const rtcMiddleware = ({ dispatch }) => {
  let peer;

  return next => action => {
    const { meta, payload, type } = action;
    switch (type) {
      case PEER_CONNECT: {
        const { stream } = payload;
        const { room } = meta;

        peer = new Peer({ initiator: true, stream, trickle: false });
        peer.on('signal', signal => {
          dispatch(sendSignal({ room, signal }));
        });

        peer.on('connect', () => dispatch(setPeer(peer)));
        peer.on('stream', peerStream => dispatch(setStream(peerStream)));

        break;
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
