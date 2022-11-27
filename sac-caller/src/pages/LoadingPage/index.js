import React from 'react';
import { Grommet, Box } from 'grommet';
import { Stretch } from 'styled-loaders-react';

const LoadingPage = () => (
  <Grommet full>
    <Box align="center" background="dark-1" justify="center" fill>
      <Stretch color="#7D4CDB" size="100px" />
    </Box>
  </Grommet>
);

export default LoadingPage;
