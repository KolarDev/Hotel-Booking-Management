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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: [true, "Please input your name"],
        minLength: [6, "Name must not be less than 6 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: [true, "Email already exists!"],
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!!",
        },
    },
    passwordChangedAt: Date,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Hash password before save
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Skip this midddleware if password is not modified
        if (!this.isModified("password"))
            return next();
        // Hash password
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        // Clear passwordConfirm field
        this.passwordConfirm === undefined;
        // If road clear, move on....
        next();
    });
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew)
        return next();
    // Update password changedAt field anytime password is modified
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
