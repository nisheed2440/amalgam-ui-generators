// Type definitions for [~AmalgamTestContainer~]

// Controller Element Interface
export interface IElement extends Element {
  dataset: {
    json: any;
    guid: string;
    ref: string;
  };
}

// Context export interface declarations
export interface IStoreContext {
  counter?: number;
}

export interface IJsonContext {
  counterLabel?: string;
}

export interface IWindow extends Window {
  commonStore: IStoreContext;
}
