export const BAD_CONTENT = "BAD_CONTENT";
export const BAD_RESPONSE = "BAD_RESPONSE";

/**
 * Ensures a given string does not end with a trailing slash
 */
function removeTrailingSlash(str) {
  return str[str.length - 1] === "/" ? str.slice(0, -1) : str;
}

export default class JsonService {
  /**
   * Creates a new instance targeting the given base uri.
   * @param {*} baseUri
   */
  constructor(baseUri) {
    this.baseUri = removeTrailingSlash(baseUri);
  }

  /**
   * Returns a URI for a given URL path and parameters.
   * @param {String} path The path part to be based from the baseUri
   */
  getUri(path) {
    return this.baseUri + path;
  }

  /**
   * Handles taking a fetch request and returning the response body
   * via the response deserializer. If the response was
   * a non-success status code then an exception is thrown that
   * includes the response body and status code.
   */
  async getResponse(path) {
    const response = await fetch(this.getUri(path));
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
      // note that our error object contains an error code indicator
      // which is a standard adopted by node.js to make detection of
      // specific error types more robust:
      // https://nodejs.org/api/errors.html#errors_error_code
      // we also include the response body and status code as these
      // will be important for exception recovery
      const error = new Error("Bad response received from server");
      error.code = BAD_RESPONSE;
      error.status = response.status;
      error.body = body;

      throw error;
    }

    // if we got this far then the response was successful but the content of the
    // response could not be deserialized, so we'll throw a bad content exception
    if (deserializationError != null) {
      const error = new Error("Bad content received from server");
      error.code = BAD_CONTENT;
      error.status = response.status;
      error.body = text;

      throw error;
    }

    return body;
  }
}
