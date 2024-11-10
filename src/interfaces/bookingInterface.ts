import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  room: string;
  user: Types.ObjectId;
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  createdAt: Date;
}
