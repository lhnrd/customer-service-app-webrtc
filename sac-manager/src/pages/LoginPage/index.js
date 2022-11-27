import React from 'react';
import { Box, Grommet } from 'grommet';

import LoginForm from 'src/components/LoginForm';

const LoginPage = () => (
  <Grommet full>
    <Box
      align="center"
      alignContent="center"
      alignSelf="center"
      justify="center"
      fill
    >
      <Box
        width="medium"
        border={{ color: 'neutral-1', size: 'large' }}
        pad="large"
      >
        <LoginForm />
      </Box>
    </Box>
  </Grommet>
);

export default LoginPage;
