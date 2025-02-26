"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    roomNumber: {
        type: String,
        unique: true,
        required: true,
    },
    type: {
        type: String,
        enum: ["regular", "vip", "vvip"],
        required: true,
    },
    price_per_night: {
        type: Number,
        required: true,
    },
    bookings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const Room = (0, mongoose_1.model)("Room", roomSchema);
module.exports = Room;
