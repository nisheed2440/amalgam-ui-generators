import React from 'react';
import TestRenderer from 'react-test-renderer';
import AmalgamTestContainer from '../AmalgamTestContainer';

describe('AmalgamTestContainer', () => {
  it('should render AmalgamTestContainer', () => {
    const AmalgamTestContainerInstance = TestRenderer.create(<AmalgamTestContainer />);
    expect(AmalgamTestContainerInstance).toMatchSnapshot();
  });
});
