import mongoose, { Schema } from "mongoose";

export interface IBooking extends Document {
  room: string;
  user: Types.ObjectId;
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  createdAt: Date;
}



const bookingSchema = new Schema<IBooking>(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    }, 
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
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

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export { Booking }
