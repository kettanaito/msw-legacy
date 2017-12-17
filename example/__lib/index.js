/**
 * Mockery constructor.
 */
const MockeryClient = function (options) {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported in the current browser.');
  }

  this.swFilePath = './mockery-sw.js';
  this.options = options;
  this.encodedOptions = Object.assign({}, options, {
    rules: options.rules.map((rule) => {
      /**
       * Convert all method functions to strings.
       * At the moment it is impossible to pass a function / object containing function
       * via "postMessage". That would result into error.
       */
      ['get', 'post', 'put', 'options', 'delete'].forEach((method) => {
        if (rule.hasOwnProperty(method)) {
          rule[method] = rule[method].toString();
        }
      });

      return rule;
    })
  });

  return this;
};

/**
 * Retrieves the currently active instance of Mockery Service Worker.
 */
MockeryClient.prototype.getSW = function () {
  return navigator.serviceWorker.getRegistration(this.swFilePath);
}

/**
 * Registers a new instance of Mockery Service Worker.
 */
MockeryClient.prototype.start = async function () {
  const existingSW = await this.getSW();
  if (existingSW) {
    throw new Error('Cannot start another instance of Mockery Service Worker. Active instance of Service Worker is already running.');
  }

  navigator.serviceWorker.register(this.swFilePath, { scope: '/' })
    .then((reg) => {
      const sw = reg.active || reg.installing || reg.waiting;

      /* Send the options to Service Worker */
      sw.postMessage({
        type: 'init',
        options: this.encodedOptions
      });
    }).catch(function (error) {
      throw new Error(`Registration of Mockery SW failed. ${error}`);
    });
};

/**
 * Stops currently running instance of Mockery Service Worker.
 */
MockeryClient.prototype.stop = async function () {
  const existingSW = await this.getSW();
  if (!existingSW) return;

  existingSW.unregister();
  return true;
};
