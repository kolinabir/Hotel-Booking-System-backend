import { Schema, model } from 'mongoose';
import { TBookList, TRoom } from './room.interface';

const bookListSchema = new Schema<TBookList>({
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bookedAt: {
    type: Date,
  },
  bookedFor: {
    type: String,
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
});

const roomSchema = new Schema<TRoom>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bedCount: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
    enum: ['single', 'double', 'triple', 'quad'],
  },
  price: {
    type: Number,
    required: true,
  },
  breakfastIncluded: {
    type: Boolean,
    required: true,
  },
  dinnerIncluded: {
    type: Boolean,
    required: true,
  },
  lunchIncluded: {
    type: Boolean,
    required: true,
  },
  roomQuality: {
    type: String,
    required: true,
    enum: ['normal', 'deluxe', 'super deluxe'],
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bookedAt: {
    type: Date,
  },
  bookedFor: {
    type: String,
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  bookList: [bookListSchema],
});

export const Room = model<TRoom>('Room', roomSchema);
