"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith("4") ? "Failed!" : "Error";
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
