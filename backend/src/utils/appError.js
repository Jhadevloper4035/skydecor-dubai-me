class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 4xx = fail, 5xx = error
    this.isOperational = true; // marks this as an intentional error, safe to send to client
    this.code = code; // optional machine-readable code e.g. 'USER_NOT_FOUND'

    // exclude this constructor from the stack trace

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
