import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';

import AppPage from 'src/pages/AppPage';
import LoadingPage from 'src/pages/LoadingPage';
import * as serviceCallActions from 'src/actions/service-call';

const getActiveServiceCall = state => {
  const serviceCallId = state.ui.activeServiceCall;
  const serviceCall = state.entities.serviceCalls.byId[serviceCallId];

  return serviceCall;
};

const mapStateToProps = state => ({
  serviceCall: getActiveServiceCall(state),
});

const mapDispatchToProps = {
  createServiceCall: serviceCallActions.createServiceCall,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const { createServiceCall, match } = this.props;
      const { customerId } = match.params;

      createServiceCall({ customerId });
    },
  }),
  branch(({ serviceCall }) => !serviceCall, renderComponent(LoadingPage))
)(AppPage);
