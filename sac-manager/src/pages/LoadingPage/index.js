import React from 'react';
import PropTypes from 'prop-types';
import { Grommet, Box } from 'grommet';
import { Stretch } from 'styled-loaders-react';

const LoadingPage = ({ full }) =>
  full ? (
    <Grommet full>
      <Box align="center" background="dark-1" justify="center" fill>
        <Stretch color="#7D4CDB" size="100px" />
      </Box>
    </Grommet>
  ) : (
    <Box fill>
      <Box align="center" background="dark-1" justify="center" fill>
        <Stretch color="#7D4CDB" size="100px" />
      </Box>
    </Box>
  );

LoadingPage.propTypes = {
  full: PropTypes.bool,
};

LoadingPage.defaultProps = {
  full: false,
};

export default LoadingPage;
