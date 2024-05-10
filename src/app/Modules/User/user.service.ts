/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const newPayload = {
    ...payload,
  };
  const result = await User.create(newPayload);
  const { password, ...user } = result.toObject();
  return user;
};

export const UserService = {
  createUserIntoDB,
};
