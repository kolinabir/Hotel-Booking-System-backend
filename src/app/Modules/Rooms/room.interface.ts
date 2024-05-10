import { Types } from 'mongoose';

export type TBookList = {
  bookedBy: Types.ObjectId;
  bookedAt: Date;
  bookedFor: string;
  checkIn?: Date;
  checkOut?: Date;
};

export type TRoom = {
  name: string;
  description: string;
  bedCount: number;
  roomType: 'single' | 'double' | 'triple' | 'quad';
  price: number;
  breakfastIncluded: boolean;
  dinnerIncluded: boolean;
  lunchIncluded: boolean;
  roomQuality: 'normal' | 'deluxe' | 'super deluxe';
  isBooked?: boolean;
  bookedBy?: Types.ObjectId;
  bookedAt?: Date;
  bookedFor?: string;
  checkIn?: Date;
  checkOut?: Date;
  bookList?: TBookList[];
};
