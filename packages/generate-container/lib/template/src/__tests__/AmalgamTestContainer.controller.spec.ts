import { Application } from 'stimulus';
import ContainerController from '../AmalgamTestContainer.controller';
import { IWindow } from '../AmalgamTestContainer.interfaces';

describe('AmalgamTestContainer Controller', () => {
  let application: any;

  beforeEach(() => {
    (window as IWindow).commonStore = { counter: 0 };
    document.body.innerHTML = `
    <div data-controller="amalgam-test-container" data-json='{"counterLabel": "Counter"}'></div>
  `;
    application = Application.start();
  });

  it('should mount AmalgamTestContainer and connect controller', () => {
    const spy = jest.spyOn(ContainerController.prototype, 'connect');
    application.register('amalgam-test-container', ContainerController);
    expect(spy).toHaveBeenCalled();
  });

  it('should throw error on AmalgamTestContainer connect on json error', () => {
    document.body.innerHTML = `
    <div data-controller="amalgam-test-container" data-json='{"counterLabel: "Counter"}'></div>
  `;
    const spy = jest.spyOn(ContainerController.prototype, 'connect');
    application.register('amalgam-test-container', ContainerController);
    expect(spy).toThrowError();
  });

  it('should unmount AmalgamTestContainer and disconnect controller', done => {
    const spy = jest.spyOn(ContainerController.prototype, 'disconnect');
    application.register('amalgam-test-container', ContainerController);
    document.body.innerHTML = '';
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 300);
  });
});
