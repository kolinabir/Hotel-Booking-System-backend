import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { RoomService } from './room.service';

const addNewRoom = catchAsync(async (req, res) => {
  const result = await RoomService.addNewRoom(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: result,
  });
});
const getAvailableRooms = catchAsync(async (req, res) => {
  const result = await RoomService.getAvailableRooms();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available rooms fetched successfully',
    data: result,
  });
});

const bookARoom = catchAsync(async (req, res) => {
  const result = await RoomService.bookARoom(req.body.roomId, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room booked successfully',
    data: result,
  });
});

const checkInDate = catchAsync(async (req, res) => {
  const userId = req.user.role === 'user' ? req.user._id : null;
  const result = await RoomService.checkInDate(
    req.body.roomId,
    req.body.checkIn,
    userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check-in successfully',
    data: result,
  });
});
const checkOutDate = catchAsync(async (req, res) => {
  const userId = req.user.role === 'user' ? req.user._id : null;
  const result = await RoomService.checkOutDate(
    req.body.roomId,
    req.body.checkOut,
    userId || null,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check-out successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const userId = req.user.role === 'user' ? req.user._id : null;
  const result = await RoomService.cancelBooking(req.body.roomId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

export const RoomController = {
  addNewRoom,
  getAvailableRooms,
  bookARoom,
  checkInDate,
  checkOutDate,
  cancelBooking,
};
