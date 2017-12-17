import { MockeryOptions } from './types';

const restMethods = ['get', 'post', 'put', 'options', 'delete'];

/**
 * Encodes the given options.
 * Converts the response getters (get, post, etc.) from "rules" declarations to strings.
 * This is because there is no way to pass a function to service worker using "postMessage".
 */
function encodeOptions(options: MockeryOptions): MockeryOptions<string> {
  const clonedOptions: MockeryOptions<any> = Object.assign({}, options);

  const encodedRules = clonedOptions.rules.map((rule) => {
    Object.keys(rule).forEach((ruleKey) => {
      if (restMethods.includes(ruleKey)) {
        rule[ruleKey] = rule[ruleKey].toString();
      }
    });

    return rule;
  });

  return {
    ...clonedOptions,
    rules: encodedRules
  };
}

export default class MockeryClient {
  options: MockeryOptions;
  instance: ServiceWorkerRegistration;

  constructor(options: MockeryOptions) {
    /* Check if service worker is supported */
    if (!('serviceWorker' in navigator)) {
      throw new Error('Cannot create an instance of Mockery client: Service workers are not supported in the current environment (browser).');
    }

    this.options = options;

    return this;
  }

  /**
   * Starts the service worker for Mockery client.
   * Service worker is responsible for intercepting fetch requests and mocking their responses on the client side.
   */
  async start() {
    /* Check if the service worker already exists */
    if (this.instance) {
      throw new Error(`Starting Mockery client failed. Respective service worker is already running. ${this.instance}`);
    }

    /* Register a new Service worker instance */
    return navigator.serviceWorker.register(this.options.serviceWorkerFilepath, { scope: '/' })
      .then((reg) => {
        const serviceWorker = reg.active || reg.installing || reg.waiting;

        /* Send init message to the Service worker to pass encoded options */
        serviceWorker.postMessage({
          type: 'init',
          options: encodeOptions(this.options)
        });

        this.instance = reg;
      })
      .catch((error) => {
        throw new Error(`Starting Mockery client failed. ${error}`);
      });
  }

  /**
   * Stops currently running instance of Mockery Service Worker.
   */
  async stop() {
    if (!this.instance) {
      return console.warn('Cannot stop Mockery service worker: no service worker is running.');
    }

    return this.instance.unregister();
  }
}
