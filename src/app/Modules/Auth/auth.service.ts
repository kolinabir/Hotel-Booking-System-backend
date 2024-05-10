/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../middlewares/Errors/AppError';

const loginUser = async (payload: TLoginUser) => {
  //check if user exists in database
  const userExists = await User.findOne({ userId: payload?.userId }).select(
    '+password',
  );
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User not found');
  }
  if (!(await User.isPasswordMatch(payload?.password, userExists?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not correct');
  }
  const token = jwt.sign(
    {
      userId: userExists.userId,
      email: userExists.email,
      role: userExists.role,
      iat: Date.now(),
    },
    config.JWT_SECRET as string,
    {
      expiresIn: '2h',
    },
  );

  const { password, createdAt, updatedAt, __v, ...user } =
    userExists.toObject();
  return {
    user: user,
    token,
  };
};

const changePasswordToServer = async (
  user: JwtPayload,
  passwordData: { oldPassword: string; newPassword: string },
) => {
  const userExists = await User.findOne({ userId: user.userId }).select(
    '+password',
  );
  console.log(userExists, 'userExists');
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User not found');
  }
  if (
    !(await User.isPasswordMatch(
      passwordData.oldPassword,
      userExists?.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  const newHashedPassword = await bcrypt.hash(
    passwordData.newPassword,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  const result = await User.findOneAndUpdate(
    {
      userId: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
    },
    {
      new: true,
    },
  );

  const userRes = await User.findOne({
    userId: user.userId,
  }).select('-__v');
  return userRes;
};

const checkAuthentication = async (user: JwtPayload) => {
  const userExists = await User.findOne({
    userId: user.userId,
  });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User not found');
  }
  return userExists;
};

export const AuthServices = {
  loginUser,
  changePasswordToServer,
  checkAuthentication,
};
