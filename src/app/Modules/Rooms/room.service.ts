import { TRoom } from './room.interface';
import { Room } from './room.model';

const addNewRoom = async (payload: TRoom) => {
  const newRoom = await Room.create(payload);
  return newRoom;
};

const getAvailableRooms = async () => {
  const rooms = await Room.find({ isBooked: false });
  return rooms;
};

export const RoomService = {
  addNewRoom,
  getAvailableRooms,
};
