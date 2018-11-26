import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grommet } from 'grommet';

import ServiceCallFeedbackForm from 'src/containers/ServiceCallFeedbackForm';
import VideoChat from 'src/containers/VideoChat';

const AppPage = ({ serviceCall }) => (
  <Grommet full>
    <Box align="center" justify="center" background="light-3" fill>
      <ServiceCallFeedbackForm />
    </Box>
    {serviceCall && <VideoChat room={serviceCall.id} />}
  </Grommet>
);

AppPage.propTypes = {
  serviceCall: PropTypes.shape({
    id: PropTypes.string,
  }),
};

AppPage.defaultProps = {
  serviceCall: null,
};

export default AppPage;
