import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

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
  },
  bookedBy: {
    type: String,
  },
  bookedAt: {
    type: Date,
  },
});

export const Room = model<TRoom>('Room', roomSchema);
