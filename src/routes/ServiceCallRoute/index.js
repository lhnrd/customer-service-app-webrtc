import { connect } from 'react-redux';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { format } from 'date-fns';
import ms from 'ms';

import LoadingPage from 'src/pages/LoadingPage';
import ServiceCallPage from 'src/pages/ServiceCallPage';
import {
  serviceCallCustomerSelector,
  serviceCallSelector,
} from 'src/selectors/service-call';

const mapStateToProps = (state, { match }) => {
  const serviceCall = serviceCallSelector(state, match.params.serviceCallId);
  let customer;

  if (serviceCall) {
    customer = serviceCallCustomerSelector(state, serviceCall.customerId);
  }

  return {
    customer,
    serviceCall,
  };
};

export default compose(
  connect(mapStateToProps),
  branch(({ serviceCall }) => !serviceCall, renderComponent(LoadingPage)),
  withProps(({ customer, serviceCall }) => {
    const {
      callRating,
      description,
      duration,
      endedAt,
      isSolved,
      serviceRating,
      startedAt,
    } = serviceCall;
    const { email, name } = customer;

    return {
      callRating,
      customerEmail: email,
      customerName: name,
      description,
      duration: duration ? ms(duration) : 'on going',
      endedAt: format(endedAt, 'HH:mm dd/MM'),
      isSolved,
      serviceRating,
      startedAt: format(startedAt, 'HH:mm dd/MM'),
    };
  })
)(ServiceCallPage);
