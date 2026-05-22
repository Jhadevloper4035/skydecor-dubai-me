// Wraps an async controller so any thrown error is automatically forwarded to next(err).
// Removes the need to write try/catch in every single controller.

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
