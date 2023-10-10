const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

// if it resolves the promise then it will call next which the calls the successive piece of middleware
