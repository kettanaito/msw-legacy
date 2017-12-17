import { MockeryOptions } from './types';
export default class MockeryClient {
    serviceWorkerFilepath: any;
    instance: ServiceWorkerRegistration;
    options: MockeryOptions;
    constructor(options: MockeryOptions);
    /**
     * Starts the service worker for Mockery client.
     * Service worker is responsible for intercepting fetch requests and mocking their responses on the client side.
     */
    start(): Promise<void>;
    /**
     * Stops currently running instance of Mockery Service Worker.
     */
    stop(): Promise<boolean | void>;
}
