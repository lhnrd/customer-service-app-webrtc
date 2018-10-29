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

const LocalVideoChatOverlay = styled(Box).attrs({
  round: true,
})`
  position: absolute;
  background-color: rgba(221, 221, 221, 0.2);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  animation: 0.3s ${fadeOut} 3.2s ease-in forwards;

  &:active,
  &:hover {
    animation: unset;
    opacity: 1;
    transition: unset;
  }
`;

export default LocalVideoChatOverlay;
