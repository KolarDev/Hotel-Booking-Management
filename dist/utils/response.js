"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function handleData(data, isError = false) {
    if (!data.data) {
        data.data = {};
    }
    data.message = (data === null || data === void 0 ? void 0 : data.message) || (isError ? "Error" : "Success");
    data.error = isError;
}
function success(_a) {
    var { res } = _a, data = __rest(_a, ["res"]);
    data.code = data.code || 200;
    handleData(data);
    return res.status(data.code).json(data.data);
}
function error(_a) {
    var { res } = _a, data = __rest(_a, ["res"]);
    data.code = data.code || 500;
    handleData(data, true);
    return res.status(data.code).json(data);
}
exports.default = {
    success,
    error,
};
