/**
 * @class LoadError
 */
export default class LoadError extends Error {
  constructor(message, assetLoader) {
    super(...arguments);
    this.name = 'LoadError';
    this.message = message;
    this.loader = assetLoader;
  }

  retryLoad() {
    throw new Error(`You must define a behavior for 'retryLoad' in a subclass.`);
  }

  _invokeAndCache(method, ...args) {
    return this._retry || (this._retry = this.loader[method](...args));
  }
}
