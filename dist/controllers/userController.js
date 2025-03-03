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
exports.updateMe = exports.getMe = exports.getAllUsers = void 0;
const userModel_1 = require("./../models/userModel");
const appError_1 = __importDefault(require("./../utils/appError"));
// Get all Users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.User.find();
    if (!users)
        next(new appError_1.default("Users not found!", 404));
    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});
exports.getAllUsers = getAllUsers;
// Get User Profile details
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const user = yield userModel_1.User.findById(userId);
        if (!user)
            next(new appError_1.default("User not found!", 404));
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(200).json({
            status: "Failed!",
            message: "Error fetching user !",
        });
        console.log(error);
    }
});
exports.getMe = getMe;
// Update User Profile details
const updateMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new appError_1.default("Unauthorized access!", 401));
    }
    try {
        const { fullname, email, phoneNumber } = req.body;
        const userId = req.user._id;
        const user = yield userModel_1.User.findByIdAndUpdate(userId, {
            fullname,
            email,
            phoneNumber,
        });
        if (!user)
            next(new appError_1.default("User not found!", 404));
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(200).json({
            status: "Failed!",
            message: "Error updating user !",
        });
        console.log(error);
    }
});
exports.updateMe = updateMe;
