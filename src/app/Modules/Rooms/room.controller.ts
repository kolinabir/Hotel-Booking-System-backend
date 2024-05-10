import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { RoomService } from './room.service';

const addNewRoom = catchAsync(async (req, res) => {
  const result = await RoomService.addNewRoom(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully',
    data: result,
  });
});
const getAvailableRooms = catchAsync(async (req, res) => {
  const result = await RoomService.getAvailableRooms();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully',
    data: result,
  });
});
export const RoomController = {
  addNewRoom,
  getAvailableRooms,
};
