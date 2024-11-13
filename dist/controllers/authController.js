"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.updatePassword = exports.protectRoute = exports.logout = exports.login = exports.signup = void 0;
const util_1 = require("util");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("./../models/userModel");
const appError_1 = __importDefault(require("./../utils/appError"));
// Registering user account
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, phoneNumber, password, passwordConfirm } = req.body;
    const newUser = yield userModel_1.User.create({
        fullname,
        email,
        phoneNumber,
        password,
        passwordConfirm,
    });
    sendToken(newUser, 201, res);
});
exports.signup = signup;
// Logging user in
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.default("Provide your username and password!!", 401));
    }
    const user = yield userModel_1.User.findOne({ email }).select("+password");
    const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!user || !checkPassword) {
        return next(new appError_1.default("Invalid Credentials!!", 401));
    }
    sendToken(user, 200, res);
});
exports.login = login;
// Logout
const logout = (req, res, next) => {
    // Token invalidation logic goes here (e.g., using a blacklist)
    res.cookie("jwt", "loggedout", {
        expiresIn: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully.",
    });
};
exports.logout = logout;
// Protect route to be accessed by only loggedIn users
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Get the token from the authorization header
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    // Check if there is no token. which means the user is not logged in
    if (!token)
        return next(new appError_1.default("Please login to get access!", 401));
    // 2. Verifying the token. Server verifies by test signature
    const decoded = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
    // 3. Check if user still exists
    const confirmUser = yield userModel_1.User.findById(decoded.id);
    if (!confirmUser) {
        return next(new appError_1.default("Authentication Failed!, Try logging in again", 401));
    }
    // 4. Save the confirm user in as req.user for use in the protected route.
    req.user = confirmUser;
    // Road clear!! Move on...
    next();
});
exports.protectRoute = protectRoute;
// Password Update Functionality. Logged in users changing password
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Get the logged in user from collection
    const user = yield userModel_1.User.findById(req.user.id).select("+password");
    // 2. Check if the user's current password is correct
    const checkPassword = yield bcryptjs_1.default.compare(req.body.passwordCurrent, user.password);
    if (!checkPassword) {
        return next(new appError_1.default("Incorrect Current Password!", 401));
    }
    // 3. If current password is correct, Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    yield user.save();
    // 4. Log the user in. Send jwt
    sendToken(user, 200, res);
});
exports.updatePassword = updatePassword;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const sendToken = (user, statusCode, res) => {
    const token = generateToken(user._id);
    console.log(token);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
exports.sendToken = sendToken;
