"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const z = __importStar(require("zod"));
const configSchema = z
    .object({
    PORT: z.coerce.number().default(9000).readonly(),
    NODE_ENV: z
        .enum(["DEVELOPMENT", "PRODUCTION", "STAGING"])
        .default("DEVELOPMENT")
        .readonly(),
    ALLOWED_ORIGINS: z.string().default("*"),
    DATABASE_LOCAL: z.string().min(1, "DATABASE_LOCAL is required!"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required!"),
    JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN is required!"),
    JWT_COOKIE_EXPIRES_IN: z.coerce.number(),
    MAIL_HOST: z.string().optional(),
    MAIL_PORT: z.coerce.number().optional(),
    MAIL_USERNAME: z.string().optional(),
    MAIL_PASSWORD: z.string().optional(),
    MAIL_FROM: z.string().optional(),
    MAIL_DISPLAY_NAME: z.string().optional(),
})
    .readonly();
exports.config = configSchema.parse(process.env);
