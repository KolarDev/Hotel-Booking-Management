import { Document } from "mongoose";

export interface IBooking extends Document {
  room: string;
  user: string;
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  createdAt: Date;
}
