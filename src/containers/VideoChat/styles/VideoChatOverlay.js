import styled, { keyframes } from 'styled-components';
import { Box } from 'grommet';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const VideoChatOverlay = styled(Box).attrs({
  round: true,
})`
  animation: 0.3s ${fadeOut} 3.2s ease-in forwards;
  background-color: rgba(221, 221, 221, 0.2);
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;

  &:active,
  &:hover {
    animation: unset;
    opacity: 1;
    transition: unset;
  }
`;

export default VideoChatOverlay;
