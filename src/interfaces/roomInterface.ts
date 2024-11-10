import { Document } from "mongoose";

export interface IRoom extends Document {
  roomNumber: string;
  type: string;
  price: number;
  bookings?: string;
  createdAt: Date;
}
