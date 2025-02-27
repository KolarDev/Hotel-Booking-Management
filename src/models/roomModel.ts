import { Schema, Document, Types, model } from "mongoose";

export interface IRoom extends Document {
  roomNumber: string;
  type: string;
  price_per_night: number;
  bookings?: Types.ObjectId;
  createdAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
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
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Room = model<IRoom>("Room", roomSchema);

module.exports = Room;
