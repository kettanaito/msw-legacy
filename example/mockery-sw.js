self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  /* Update SW for all clients */
  event.waitUntil(self.clients.claim());
  console.log('%cMockery is activated!', 'color: blue');
});

/**
 * Pass Mockery options to the Service worker.
 */
self.addEventListener('message', function (event) {
  const message = event.data;
  const messageType = message.type;
  delete message.type;

  switch (messageType) {
    case 'init': {
      self.__mockery__ = {
        options: message.options
      };
    }
  }
});

/**
 * Fetch listener.
 * Listen to the fetch requests from the page, intercept the once
 * matching the mocking groups and respond to them from the SW.
 */
self.addEventListener('fetch', function (event) {
  const mockery = self.__mockery__;
  if (!mockery) return;

  const request = event.request;
  const rules = mockery.options.rules;

  rules.forEach(function (rule) {
    const urlMatches = request.url.match(rule.url);
    const responseGetter = rule[request.method.toLowerCase()];

    if (urlMatches && responseGetter) {
      const mockedResponse = eval(`(${responseGetter})`)(request);

      const resHeaders = Object.assign({
        'Content-Type': 'application/json',
        Mocked: true
      }, mockedResponse.headers);

      const response = new Response(JSON.stringify(mockedResponse.body), Object.assign({
        status: mockedResponse.status,
        headers: resHeaders
      }));

      const date = new Date();
      const timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      const formattedUrl = request.url.replace(/(\S+:\/\/)([^\/]+)\//gi, '');

      const colors = {
        200: '#00a22e',
        400: '#ea8233',
        500: '#ee3437'
      };

      console.groupCollapsed(
        `%c${timestamp} %cmockery %c@ ${request.method} ${formattedUrl}`,
        'color:gray;font-weight:normal;',
        `color:${colors[response.status]}`,
        'color:black'
      );
        console.log('URL:', request.url);
        console.log('Original request:', request);
        console.log('Matched rule:', rule.url);
        console.log('Mocked payload:', response.body);
      console.groupEnd();

      return event.respondWith(response);
    }
  });

});
