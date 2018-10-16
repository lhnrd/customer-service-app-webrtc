import React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';

import { RSSA } from 'src/constants';
/* eslint-disable */
const HomePage = ({ test }) => (
  <div>
    <Button onClick={test}>Test</Button>
  </div>
);

export default connect(
  null,
  {
    test: () => ({
      [RSSA]: {
        event: 'testme',
        message: {
          a: 1,
          lucas: true,
        },
      },
    }),
  }
)(HomePage);
