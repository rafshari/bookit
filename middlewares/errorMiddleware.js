import ErrorHandler from "utils/errorHandler";

export default (err, req, res, next) => {
  err.status = err.status || 500;
  let error = { ...err };

  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    error = new ErrorHandler(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((values) => values.message);
    error = new ErrorHandler(message, 400);
  }

  res.status(err.status).json({
    success: false,
    message: error.message,
    stack: error.stack,
    error,
  });
};
