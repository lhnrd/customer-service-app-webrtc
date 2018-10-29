import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { textAlign } from 'styled-system';

const InlineFlex = styled(Flex)`
  ${textAlign};
  display: inline-flex;
`;

export default InlineFlex;
