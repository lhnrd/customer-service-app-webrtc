import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box, Text, Grommet, Grid } from 'grommet';
import { Dashboard } from 'grommet-icons';

import { dashboardUrl } from 'src/routes/urls';
import NavLinkBox from 'src/styles/NavLinkBox';
import { DASHBOARD_PATH, SERVICE_CALL_PATH } from 'src/routes/paths';
import ServiceCallBox from 'src/components/ServiceCallBox';
import DashboardRoute from 'src/routes/DashboardRoute';
import ServiceCallRoute from 'src/routes/ServiceCallRoute';
import VideoChat from 'src/containers/VideoChat';

const AppPage = ({ serviceCallRoom, serviceCalls, setServiceCallRoom }) => (
  <Grommet full>
    <Grid
      areas={[
        { name: 'sidebar', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [1, 0], end: [1, 0] },
      ]}
      columns={['medium', 'flex']}
      rows={['flex']}
      fill
    >
      <Box
        gridArea="sidebar"
        background="dark-1"
        width="medium"
        overflow={{ horizontal: 'auto' }}
      >
        <NavLinkBox to={dashboardUrl()} exact>
          <Box
            direction="row"
            gap="small"
            pad={{ horizontal: 'medium', vertical: 'medium' }}
          >
            <Dashboard />
            <Text>Dashboard</Text>
          </Box>
        </NavLinkBox>
        {serviceCalls.map(serviceCall => (
          <ServiceCallBox
            key={serviceCall.id}
            serviceCall={serviceCall}
            onAcceptCall={serviceCallId => setServiceCallRoom(serviceCallId)}
          />
        ))}
      </Box>
      <Box
        background="light-3"
        gridArea="main"
        overflow={{ horizontal: 'auto' }}
      >
        <Switch>
          <Route path={DASHBOARD_PATH} component={DashboardRoute} />
          <Route path={SERVICE_CALL_PATH} component={ServiceCallRoute} />
          <Route render={() => <Redirect to={dashboardUrl()} />} />
        </Switch>
      </Box>
    </Grid>
    {serviceCallRoom && (
      <VideoChat
        room={serviceCallRoom}
        onHangUp={() => setServiceCallRoom(null)}
      />
    )}
  </Grommet>
);

AppPage.propTypes = {
  serviceCallRoom: PropTypes.string,
  serviceCalls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  setServiceCallRoom: PropTypes.func,
};

AppPage.defaultProps = {
  serviceCallRoom: null,
  serviceCalls: null,
  setServiceCallRoom: null,
};

export default AppPage;
