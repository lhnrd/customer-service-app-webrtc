import React from 'react';
import { Layout } from 'antd';

import FullScreenContainer from 'src/styles/FullScreenContainer';
import { Box } from '@rebass/grid';

const LoginPage = () => (
  <Layout>
    <Layout.Content>
      <FullScreenContainer alignItems="center" justifyContent="center">
        <Box width={1 / 5} />
      </FullScreenContainer>
    </Layout.Content>
  </Layout>
);

export default LoginPage;
