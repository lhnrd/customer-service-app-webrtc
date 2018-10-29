import styled from 'styled-components';
import { Box } from 'grommet';

const VideoBox = styled(Box)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 50%;

  @media screen and (min-width: 36em) {
    width: 25%;
  }
`;

export default VideoBox;
