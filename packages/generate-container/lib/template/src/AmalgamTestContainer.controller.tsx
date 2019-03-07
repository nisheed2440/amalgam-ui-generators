import React from 'react';
import ReactDOM from 'react-dom';
import { Controller } from 'stimulus';
import AmalgamTestContainer, { JsonContext, StoreContext } from './AmalgamTestContainer';
import { IElement, IJsonContext, IStoreContext, IWindow } from './AmalgamTestContainer.interfaces';

export default class ContainerController extends Controller {
  public element: IElement;
  public json: IJsonContext = {};
  public store: IStoreContext = (window as IWindow).commonStore;
  public connect() {
    try {
      this.json = JSON.parse(this.element.dataset.json);
      ReactDOM.render(
        <StoreContext.Provider value={this.store}>
          <JsonContext.Provider value={this.json}>
            <AmalgamTestContainer />
          </JsonContext.Provider>
        </StoreContext.Provider>,
        this.element
      );
    } catch (err) {
      throw err;
    }
  }
  public disconnect() {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}
