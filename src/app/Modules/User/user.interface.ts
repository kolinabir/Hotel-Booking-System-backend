/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  userId: string;
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}
export interface UserModel extends Model<TUser> {
  isUserExistsByUserName: (userId: string) => Promise<TUser>;
  isPasswordMatch: (
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}

export type TUSER_ROLE = keyof typeof USER_ROLE;
