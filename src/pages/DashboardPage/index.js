import React from 'react';
import PropTypes from 'prop-types';
import { Box as GridBox, Flex } from '@rebass/grid';
import { Box, DataTable, Heading, Stack, Meter, Text } from 'grommet';
import InlineFlex from 'src/styles/InlineFlex';

const percentage = (value, total) => (value / total) * 100;

const DashboardPage = ({
  avgCallRating,
  avgServiceRating,
  solvedCalls,
  notSolvedCalls,
  notAnsweredCalls,
  totalCalls,
}) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    css={{ height: '100%', maxWidth: '480px', margin: 'auto' }}
    width={1 / 2}
  >
    <GridBox>
      <InlineFlex
        alignItems="center"
        flexDirection="column"
        width={[1, null, null, 1 / 2]}
        p={['12px', null, null, '24px']}
      >
        <Heading level="4" margin={{ bottom: 'medium' }}>
          CALL RATING AVG
        </Heading>
        <Box align="start">
          <Stack anchor="center">
            <Meter
              type="circle"
              background="light-1"
              values={[
                {
                  value: (avgCallRating / 5) * 100,
                  color: 'brand',
                },
              ]}
              size="small"
              thickness="medium"
            />
            <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
              <Text size="xlarge" weight="bold">
                {avgCallRating}
              </Text>
              <Text size="small"> /5</Text>
            </Box>
          </Stack>
        </Box>
      </InlineFlex>
      <InlineFlex
        alignItems="center"
        flexDirection="column"
        width={[1, null, null, 1 / 2]}
        p="24px"
      >
        <Heading level="4" margin={{ bottom: 'medium' }}>
          SERVICE RATING AVG
        </Heading>
        <Box align="start">
          <Stack anchor="center">
            <Meter
              type="circle"
              background="light-1"
              values={[
                {
                  value: (avgServiceRating / 5) * 100,
                  color: 'brand',
                },
              ]}
              size="small"
              thickness="medium"
            />
            <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
              <Text size="xlarge" weight="bold">
                {avgServiceRating}
              </Text>
              <Text size="small"> /5</Text>
            </Box>
          </Stack>
        </Box>
      </InlineFlex>
    </GridBox>
    <Flex alignItems="center" flexDirection="column" width={1} p="24px">
      <Heading level="4" margin={{ bottom: 'medium' }}>
        SOLVED STATISTICS
      </Heading>
      <Box align="center">
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
              {
                property: 'percentage',
                render: datum => (
                  <Box pad={{ vertical: 'xsmall' }}>
                    <Meter
                      background="light-1"
                      values={[{ color: 'brand', value: datum.percentage }]}
                      thickness="small"
                      size="small"
                    />
                  </Box>
                ),
              },
            ]}
            data={[
              {
                key: 'Solved',
                value: solvedCalls,
                percentage: percentage(solvedCalls, totalCalls),
              },
              {
                key: 'Not solved',
                value: 0,
                percentage: percentage(notSolvedCalls, totalCalls),
              },
              {
                key: 'N/A',
                value: notAnsweredCalls,
                percentage: percentage(notAnsweredCalls, totalCalls),
              },
              {
                key: 'Total',
                value: totalCalls,
                percentage: percentage(totalCalls, totalCalls),
              },
            ]}
          />
        </Stack>
      </Box>
    </Flex>
  </Flex>
);

DashboardPage.propTypes = {
  avgCallRating: PropTypes.number,
  avgServiceRating: PropTypes.number,
  notAnsweredCalls: PropTypes.number,
  notSolvedCalls: PropTypes.number,
  solvedCalls: PropTypes.number,
  totalCalls: PropTypes.number,
};

DashboardPage.defaultProps = {
  avgCallRating: 0,
  avgServiceRating: 0,
  notAnsweredCalls: 0,
  notSolvedCalls: 0,
  solvedCalls: 0,
  totalCalls: 0,
};

export default DashboardPage;
