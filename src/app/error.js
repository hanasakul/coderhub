const errorTypes = require('../constants/error-types')
const errorHandle = (error, ctx) => {
  let message, status;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_EMPTY:
      message = errorTypes.NAME_OR_PASSWORD_IS_EMPTY;
      status = 400; // bad request
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      message = errorTypes.USER_ALREADY_EXISTS;
      status = 409; // conflict
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      message = errorTypes.USER_DOES_NOT_EXISTS;
      status = 400;
      break;
    case errorTypes.PASSWORD_INCORRECT:
      message = errorTypes.PASSWORD_INCORRECT;
      status = 400;
      break;
    case errorTypes.UNAUTHORIZED:
      message = `${errorTypes.UNAUTHORIZED}: ${ctx.message}`
      status = 401;
      break;
    case errorTypes.UNPREMISSION:
      message = errorTypes.UNPREMISSION;
      status = 403;
      break;
    default:
      message = 'not found'
      status = 404
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;
