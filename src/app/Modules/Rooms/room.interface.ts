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
  isBooked: boolean;
  bookedBy?: string;
  bookedAt?: Date;
};
