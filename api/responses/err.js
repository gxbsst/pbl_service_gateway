module.exports = function err(code, message) {

  var req = this.req;
  var res = this.res;

  var getHttpStatus = function (code) {
    switch (code) {
      case 400:
        return {
          code: 400,
          type: 'bad_request',
          message: 'The request that this server could not understand.'
        }
      case 401:
        return {
          code: 401,
          type: 'unauthorized',
          message: ' No valid API key provided.'
        }
      case 402:
        return {
          code: 402,
          type: 'request_failed',
          message: 'Parameters were valid but request failed.'
        }
      case 403:
        return {
          code: 403,
          type: 'access_forbidden',
          message: 'Missing or invalid permissions.'
        }
      case 422:
        return {
          code: 422,
          type: 'unprocessable_entity',
          message: 'Parameters were invalid/validation failed.'
        }
      case 404:
        return {
          code: 404,
          type: 'resource_not_found',
          message: "The requested item doesn't exist."
        }
      case 500:
        return {
          code: 500,
          type: 'internal_server_error',
          message: "Something went wrong."
        }
    }
  }

  var httpStatus = getHttpStatus(code);

  return res.json(code, {
    error: {
      request_url: req.url,
      type: httpStatus.type,
      code: httpStatus.code,
      message: message || httpStatus.message
    }
  });
}
