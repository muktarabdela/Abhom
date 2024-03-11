const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof CustomAPIError) {
    console.error('CustomAPIError:', err);
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }

  // Log unknown errors for further investigation
  console.error('Unknown error:', err);

  // Handle unknown errors gracefully
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
};

module.exports = errorHandlerMiddleware;
