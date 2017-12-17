export type MockeryResponse = {
  status?: number,
  headers?: Headers,
  body?: number | string | object
}

export type MockeryRule<RequestMethodHandlers> = {
  url: RegExp | string,
  get?: RequestMethodHandlers,
  post?: RequestMethodHandlers,
  put?: RequestMethodHandlers,
  delete?: RequestMethodHandlers,
  options?: RequestMethodHandlers
}

export type MockeryOptions<RequestMethodHandlers = MockeryResponse> = {
  serviceWorkerFilepath: string,
  rules: MockeryRule<RequestMethodHandlers>[]
}
