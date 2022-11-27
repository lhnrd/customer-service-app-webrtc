/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';
import { Box, DataTable, Stack, Heading, Text } from 'grommet';
import Rating from 'react-rating';
import { Star } from 'grommet-icons';

const ServiceCallPage = ({
  callRating,
  customerEmail,
  customerName,
  description,
  duration,
  endedAt,
  isSolved,
  serviceRating,
  startedAt,
}) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    css={{ height: '100%', maxWidth: '560px', margin: 'auto' }}
    width={1 / 2}
  >
    <Box>
      <Heading level="2">Service call</Heading>
      <Stack guidingChild="last">
        <DataTable
          columns={[
            {
              property: 'key',
              primary: true,
            },
            {
              property: 'value',
            },
          ]}
          data={[
            {
              key: 'Start / end / duration',
              value: `${startedAt} / ${endedAt} / ${duration}`,
            },
            {
              key: 'Call rating',
              value: (
                <Box pad={{ vertical: 'xsmall' }}>
                  <Rating
                    emptySymbol={<Star />}
                    fullSymbol={<Star color="neutral-5" />}
                    initialRating={callRating}
                    stop={5}
                    readonly
                  />
                </Box>
              ),
            },
            {
              key: 'Service rating',
              value: (
                <Box pad={{ vertical: 'xsmall' }}>
                  <Rating
                    emptySymbol={<Star />}
                    fullSymbol={<Star color="neutral-5" />}
                    initialRating={serviceRating}
                    stop={5}
                    readonly
                  />
                </Box>
              ),
            },
            {
              key: 'Is solved',
              value:
                typeof isSolved !== 'boolean' ? (
                  <Text color="neutral-5" weight="bold">
                    N/A
                  </Text>
                ) : isSolved ? (
                  <Text color="neutral-3" weight="bold">
                    SOLVED
                  </Text>
                ) : (
                  <Text color="status-critical" weight="bold">
                    NOT SOLVED
                  </Text>
                ),
            },
            {
              key: 'Description',
              value: description,
            },
          ]}
        />
      </Stack>
    </Box>
    <Box margin={{ top: 'medium' }}>
      <Heading level="2">Customer</Heading>
      <Stack guidingChild="last">
        <DataTable
          columns={[
            {
              property: 'key',
              primary: true,
            },
            {
              property: 'value',
            },
          ]}
          data={[
            {
              key: 'Name',
              value: customerName,
            },
            {
              key: 'E-mail',
              value: customerEmail,
            },
          ]}
        />
      </Stack>
    </Box>
  </Flex>
);

ServiceCallPage.propTypes = {
  callRating: PropTypes.number,
  customerEmail: PropTypes.string,
  customerName: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
  endedAt: PropTypes.string,
  isSolved: PropTypes.bool,
  serviceRating: PropTypes.number,
  startedAt: PropTypes.string,
};

ServiceCallPage.defaultProps = {
  callRating: null,
  customerEmail: null,
  customerName: null,
  description: null,
  duration: null,
  endedAt: null,
  isSolved: null,
  serviceRating: null,
  startedAt: null,
};

export default ServiceCallPage;
