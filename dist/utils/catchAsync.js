"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = catchAsync;
function catchAsync(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
}
