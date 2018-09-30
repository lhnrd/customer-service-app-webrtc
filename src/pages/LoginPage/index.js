import React from 'react';
import { Layout } from 'antd';
import { Box } from '@rebass/grid';

import FullScreenContainer from 'src/styles/FullScreenContainer';
import LoginForm from 'src/components/LoginForm';

const LoginPage = () => (
  <Layout>
    <Layout.Content>
      <FullScreenContainer alignItems="center" justifyContent="center">
        <Box width={1 / 5}>
          <LoginForm />
        </Box>
      </FullScreenContainer>
    </Layout.Content>
  </Layout>
);

export default LoginPage;
