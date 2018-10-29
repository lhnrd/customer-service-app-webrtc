import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import withDataLoading from 'src/hocs/with-data-loading';
import AppPage from 'src/pages/AppPage';
import * as serviceCallsActions from 'src/actions/service-call';
import { serviceCallsSelector } from 'src/selectors/service-call';

const mapStateToProps = state => ({
  serviceCalls: serviceCallsSelector(state),
});

const mapDispatchToProps = {
  readServiceCalls: serviceCallsActions.readServiceCalls,
};

const loadData = props => props.readServiceCalls();

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withDataLoading(loadData),
  withState('serviceCallRoom', 'setServiceCallRoom', null)
)(AppPage);
