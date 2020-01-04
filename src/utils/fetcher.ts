export class Fetcher {
  constructor(...middleware) {
    this.middleware = middleware;
  }

  with(...moreMiddleware) {
    return new Fetcher(...this.middleware, ...moreMiddleware);
  }

  fetch(...args): Promise<Response> {
    // standardize the input as a request, note that the request constructor
    // will handle the different variations of input and init, including taking
    // actual request objects themselves (which are essentially cloned)
    const request = new Request(...args);

    // per request we want to clone the original middleware sequence as we'll
    // then destructively iterate through this cloned sequence
    const stack = [...this.middleware];

    const next = request => {
      const fn = stack.shift();

      // if we have another middleware function then
      // call it; otherwise finally call fetch itself
      if (fn != null) {
        return fn(request, next);
      }

      return fetch(request);
    };

    return next(request);
  }
}
