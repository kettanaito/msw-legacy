/**
 * Mockery constructor.
 */
const MockeryWorker = function (options) {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported in the current browser.');
  }

  this.swFilePath = './mockery-sw.js';
  this.options = options;

  return this;
};

/**
 * Retrieves the currently active instance of Mockery Service Worker.
 */
MockeryWorker.prototype.getSW = function () {
  return navigator.serviceWorker.getRegistration(this.swFilePath);
}

/**
 * Registers a new instance of Mockery Service Worker.
 */
MockeryWorker.prototype.start = function () {
  this.getSW()
    .then((sw) => {
      if (sw) {
        throw new Error('Cannot start another instance of Mockery Service Worker. Active instance of Service Worker is already running.');
      }
    })
    .then(() => {
      navigator.serviceWorker.register(this.swFilePath, { scope: '/' }).then((reg) => {
        const sw = reg.active || reg.installing || reg.waiting;

        sw.postMessage({
          type: 'init',
          options: this.options
        });
      });
    }).catch(function (error) {
      throw new Error(`Registration of Mockery SW failed. ${error}`);
    });
};

/**
 * Stops currently running instance of Mockery Service Worker.
 */
MockeryWorker.prototype.stop = function () {
  this.getSW().then((sw) => {
    sw.unregister();
    return true;
  }).catch(function (error) {
    throw new Error(`Terminating Mockery SW failed. ${error}`);
  });
};
