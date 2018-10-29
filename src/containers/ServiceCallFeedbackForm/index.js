import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, RadioButton, Button } from 'grommet';
import Rating from 'react-rating';
import { Star } from 'grommet-icons';
import { withStateHandlers } from 'recompose';

const validate = ({ callRating, serviceRating, isSolved }) => {
  if (callRating === 0) return false;
  if (serviceRating === 0) return false;
  if (!isSolved) return false;
  return true;
};

const ServiceCallFeedbackForm = ({
  callRating,
  isSolved,
  serviceRating,
  setCallRating,
  setIsSolved,
  setServiceRating,
}) => (
  <form>
    <Heading level="4">CALL</Heading>
    <Rating
      emptySymbol={<Star />}
      fullSymbol={<Star color="neutral-5" />}
      initialRating={callRating}
      onChange={setCallRating}
      stop={5}
    />
    <Heading level="4">SERVICE</Heading>
    <Rating
      emptySymbol={<Star />}
      fullSymbol={<Star color="neutral-5" />}
      initialRating={serviceRating}
      onChange={setServiceRating}
      stop={5}
    />
    <Heading level="4">DID YOU SOLVED YOUR PROBLEM?</Heading>
    <Box direction="row" gap="medium">
      <RadioButton
        label="YES"
        name="is-solved"
        value="solved"
        checked={isSolved === 'solved'}
        onChange={setIsSolved}
      />
      <RadioButton
        label="NO"
        name="is-solved"
        value="not-solved"
        checked={isSolved === 'not-solved'}
        onChange={setIsSolved}
      />
    </Box>
    <Button
      color="status-ok"
      label="Send feedback"
      margin={{ top: 'medium' }}
      disabled={!validate({ callRating, serviceRating, isSolved })}
      primary
    />
  </form>
);

ServiceCallFeedbackForm.propTypes = {
  callRating: PropTypes.number.isRequired,
  isSolved: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  serviceRating: PropTypes.number.isRequired,
  setCallRating: PropTypes.func.isRequired,
  setIsSolved: PropTypes.func.isRequired,
  setServiceRating: PropTypes.func.isRequired,
};

ServiceCallFeedbackForm.defaultProps = {};

export default withStateHandlers(
  {
    callRating: 0,
    serviceRating: 0,
    isSolved: false,
  },
  {
    setServiceRating: () => value => ({
      serviceRating: value,
    }),
    setCallRating: () => value => ({
      callRating: value,
    }),
    setIsSolved: () => event => ({
      isSolved: event.target.value,
    }),
  }
)(ServiceCallFeedbackForm);
