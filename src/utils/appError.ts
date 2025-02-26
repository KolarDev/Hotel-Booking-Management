class AppError extends Error {
  statusCode: number;

  isOperational: boolean;

  status: string;

  override stack?: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "Failed!" : "Error";
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
