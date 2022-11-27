/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import { Button, Box, Text } from 'grommet';
import { Star } from 'grommet-icons';
import Rating from 'react-rating';
import { format } from 'date-fns';
import ms from 'pretty-ms';
import { connect } from 'react-redux';

import NavLinkBox from 'src/styles/NavLinkBox';
import { serviceCallUrl } from 'src/routes/urls';
import { serviceCallCustomerSelector } from 'src/selectors/service-call';

const ServiceCallMenuItem = ({
  callRating,
  customerName,
  duration,
  isSolved,
  onClickAcceptCall,
  serviceCallId,
  serviceRating,
  startedAt,
}) => (
  <NavLinkBox key={serviceCallId} to={serviceCallUrl(serviceCallId)}>
    <Box
      justify="between"
      height="130px"
      pad={{ horizontal: 'medium', vertical: 'medium' }}
    >
      <Box direction="row" justify="between" gap="medium">
        <Text truncate>{customerName}</Text>
        <Box
          direction="row"
          justify="between"
          gap="medium"
          style={{ minWidth: 'auto' }}
        >
          {!startedAt ? (
            <Text color="neutral-3" style={{ whiteSpace: 'nowrap' }}>
              IS CALLING
            </Text>
          ) : (
            <>
              <Text
                color={duration ? 'neutral-4' : 'neutral-5'}
                style={{ whiteSpace: 'nowrap' }}
              >
                {!duration ? 'on going' : ms(duration)}
              </Text>
              <Text
                margin={{ left: 'xsmall' }}
                color="neutral-4"
                style={{ whiteSpace: 'nowrap' }}
              >
                {format(startedAt, 'dd/MM')}
              </Text>
            </>
          )}
        </Box>
      </Box>
      {!startedAt ? (
        <Button
          color="accent-2"
          label="Answer call"
          onClick={onClickAcceptCall}
          primary
        />
      ) : (
        <>
          <div className="service-call__solved">
            {typeof isSolved !== 'boolean' ? (
              <Text color="status-warning">N/A</Text>
            ) : isSolved ? (
              <Text color="status-ok">SOLVED</Text>
            ) : (
              <Text color="status-critical">NOT SOLVED</Text>
            )}
          </div>
          <Box
            className="service-call__rating"
            direction="row"
            gap="medium"
            justify="between"
          >
            <Box direction="row" gap="xsmall">
              <Text>C:</Text>
              {callRating > 0 ? (
                <Rating
                  emptySymbol={<Star />}
                  fullSymbol={<Star color="neutral-5" />}
                  initialRating={callRating}
                  stop={5}
                  readonly
                />
              ) : (
                <Text>N/A</Text>
              )}
            </Box>
            <Box direction="row" gap="xsmall">
              <Text>S:</Text>
              {serviceRating > 0 ? (
                <Rating
                  emptySymbol={<Star />}
                  fullSymbol={<Star color="neutral-5" />}
                  initialRating={serviceRating}
                  stop={5}
                  readonly
                />
              ) : (
                <Text>N/A</Text>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  </NavLinkBox>
);

ServiceCallMenuItem.propTypes = {
  callRating: PropTypes.number,
  customerName: PropTypes.string,
  duration: PropTypes.number,
  isSolved: PropTypes.bool,
  serviceCallId: PropTypes.string,
  serviceRating: PropTypes.number,
  startedAt: PropTypes.string,
  onClickAcceptCall: PropTypes.func,
};

ServiceCallMenuItem.defaultProps = {
  callRating: 0,
  customerName: null,
  duration: 0,
  isSolved: false,
  serviceCallId: null,
  serviceRating: 0,
  startedAt: null,
  onClickAcceptCall: null,
};

const mapStateToProps = (state, { serviceCall }) => ({
  customer: serviceCallCustomerSelector(state, serviceCall.customerId),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withProps(({ serviceCall, customer }) => ({
    callRating: serviceCall.callRating,
    customerName: customer.name || customer.email,
    duration: serviceCall.duration,
    isSolved: serviceCall.isSolved,
    serviceCallId: serviceCall.id,
    serviceRating: serviceCall.serviceRating,
    startedAt: serviceCall.startedAt,
  })),
  withHandlers({
    onClickAcceptCall: ({ serviceCallId, onAcceptCall }) => () =>
      onAcceptCall(serviceCallId),
  })
)(ServiceCallMenuItem);
