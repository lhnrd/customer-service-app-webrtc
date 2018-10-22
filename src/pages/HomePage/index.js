import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import * as actions from 'src/actions/socket';

/* eslint-disable */
const HomePage = ({ connectSocket }) => (
  <div>
    <Button onClick={connectSocket}>Test</Button>
  </div>
);

export default connect(
  null,
  {
    connectSocket: actions.connectSocket,
  }
)(HomePage);
