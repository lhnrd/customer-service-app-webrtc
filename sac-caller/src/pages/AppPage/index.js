import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grommet, Heading } from 'grommet';

import ServiceCallFeedbackForm from 'src/containers/ServiceCallFeedbackForm';
import VideoChat from 'src/containers/VideoChat';

const AppPage = ({ serviceCall }) => (
  <Grommet full>
    {serviceCall &&
      serviceCall.endedAt && (
        <Box align="center" justify="center" background="light-3" fill>
          {serviceCall.callRating > 0 ? (
            <Heading level="1">THANKS FOR RATING!</Heading>
          ) : (
            <ServiceCallFeedbackForm id={serviceCall.id} />
          )}
        </Box>
      )}
    {serviceCall && !serviceCall.endedAt && <VideoChat room={serviceCall.id} />}
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
