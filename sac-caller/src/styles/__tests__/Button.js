import React from 'react';
import { render } from 'react-testing-library';

import Button from '../Button';

describe('[styled-component] Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
