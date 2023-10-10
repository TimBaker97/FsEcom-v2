const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalRul}`);
  res.status(404);
  next(error);
};

const errorHandler = (req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for mongoose bad ObjectId (CastError)
  if (err.name === "CaseErrot" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
