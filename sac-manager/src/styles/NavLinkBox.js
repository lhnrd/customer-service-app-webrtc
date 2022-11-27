import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavLinkBox = styled(NavLink)`
  color: #ffffff;

  .service-call__rating {
    display: none;
  }

  .service-call__solved {
    display: flex;
  }

  &.active {
    background-color: rgba(221, 221, 221, 0.4);
    color: #ffffff;
  }

  &:hover {
    background-color: rgba(221, 221, 221, 0.4);
    color: #ffffff;

    .service-call__rating {
      display: flex;
    }

    .service-call__solved {
      display: none;
    }
  }
`;

export default NavLinkBox;
