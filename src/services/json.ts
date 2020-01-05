const removeTrailingSlash = str =>
  str[str.length - 1] === "/" ? str.slice(0, -1) : str;

const JSON_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const BAD_CONTENT = "BAD_CONTENT";
export const BAD_RESPONSE = "BAD_RESPONSE";

// note that our error object contains an error code indicator
// which is a standard adopted by node.js to make detection of
// specific error types more robust:
// https://nodejs.org/api/errors.html#errors_error_code
class HttpResponseError extends Error {
  code: string;
  status: number;
  body;

  constructor(message: string, code: string, status: number, body) {
    super(message);
    this.code = code;
    this.status = status;
    this.body = body;
  }
}

async function getResponse(response: Response) {
  const text = await response.text();

  let body;
  let deserializationError;

  // we try to deserialize the response data but we want
  // to avoid an exception during deserialization from
  // hiding an underlying response error, so we'll try and
  // deserialize and capture any errors which we'll throw later
  try {
    body = JSON.parse(text);
  } catch (err) {
    deserializationError = err;
  }

  // if our response status is not ok we want to throw and trigger
  // exceptional flow, we do this after parsing the response body
  // as the response body may contain information that can allow
  // recovery, such as validation details during a POST / PATCH
  if (response.ok !== true) {
    // we also include the response body and status code as these
    // will be important for exception recovery
    throw new HttpResponseError(
      "Bad response received from server",
      BAD_RESPONSE,
      response.status,
      body
    );
  }

  // if we got this far then the response was successful but the content of the
  // response could not be deserialized, so we'll throw a bad content exception
  if (deserializationError != null) {
    throw new HttpResponseError(
      deserializationError.message,
      BAD_CONTENT,
      response.status,
      text
    );
  }

  return body;
}

export class JsonService {
  baseUrl: string;
  fetcher: Fetcher;
  parser: Parser;

  constructor(baseUrl: string, fetcher) {
    this.baseUrl = removeTrailingSlash(baseUrl);
    this.fetcher = fetcher;
  }

  getURL(path: string, query: {}): string {
    const qs = new URLSearchParams(query || {});
    return this.baseUrl + path + (qs ? `?${qs}` : "");
  }

  async fetch(path: string, query?: {}, init?: RequestInit) {
    const headers =
      init == null ? JSON_HEADERS : { ...JSON_HEADERS, ...init.headers };
    const response = await this.fetcher.fetch(this.getURL(path, query), {
      ...init,
      headers
    });
    const body = await getResponse(response);

    return [body, response];
  }
}
