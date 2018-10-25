import React from 'react';
import { Route } from 'react-router-dom';
import { VIDEO_PATH } from 'src/routes/paths';

import VideoRoute from 'src/routes/VideoRoute';

const HomePage = () => (
  <>
    <div />
    <Route component={VideoRoute} path={VIDEO_PATH} />
  </>
);

export default HomePage;
