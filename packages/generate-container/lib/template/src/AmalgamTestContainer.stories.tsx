import { storiesOf } from '@storybook/react';
import React from 'react';
import AmalgamTestContainer, { StoreContext, JsonContext } from './AmalgamTestContainer';

storiesOf('AmalgamTestContainer', module).add('default', () => (
  <StoreContext.Provider value={{ counter: 0 }}>
    <JsonContext.Provider value={{ counterLabel: 'Amalgam UI Counter:' }}>
      <AmalgamTestContainer />
    </JsonContext.Provider>
  </StoreContext.Provider>
));
