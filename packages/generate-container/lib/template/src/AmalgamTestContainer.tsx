import { observer } from 'mobx-react-lite';
import React, { createContext, useContext } from 'react';
import { IStoreContext, IJsonContext } from './AmalgamTestContainer.interfaces';

// The common store context
export const StoreContext = createContext<IStoreContext>({});
// The JSON data context coming from CMS
export const JsonContext = createContext<IJsonContext>({});

// A memoized component which uses observer
export default observer(() => {
  const store = useContext(StoreContext);
  const json = useContext(JsonContext);
  return (
    <div className="component">
      {json.counterLabel} {store.counter}
    </div>
  );
});
