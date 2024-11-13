"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// const scheduler = require("./utils/scheduler"); ///////////
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// // Serving Static Files
// app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hey there! from the sever side",
        app: "Hotel-Reservation-System",
    });
});
app.use("/api/v1/users", userRoutes_1.default);
exports.default = app;
