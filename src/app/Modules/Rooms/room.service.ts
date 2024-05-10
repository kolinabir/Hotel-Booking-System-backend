import { User } from '../User/user.model';
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

const bookARoom = async (roomId: string, userId: string) => {
  const userExists = await User.findOne({ userId: userId });
  if (userExists) {
    const room = await Room.findOneAndUpdate(
      { _id: roomId, isBooked: false },
      { isBooked: true, bookedBy: userExists._id, bookedAt: new Date() },
      { new: true },
    );
    if (!room) {
      throw new Error('Room is not available');
    }
    return room;
  } else {
    throw new Error('User not found');
  }
};

const checkInDate = async (roomId: string, checkIn: Date, userId: string) => {
  //check if the user booked the room
  if (userId !== null) {
    const checkRoom = await Room.findOne({ _id: roomId, bookedBy: userId });
    if (!checkRoom) {
      throw new Error('Room not found');
    }
  }
  const room = await Room.findByIdAndUpdate(
    { _id: roomId },
    { checkIn: checkIn },
    { new: true },
  );
  return room;
};

const checkOutDate = async (roomId: string, checkOut: Date, userId: string) => {
  if (userId !== null) {
    const checkRoom = await Room.findOne({ _id: roomId, bookedBy: userId });
    if (!checkRoom) {
      throw new Error('Room not found');
    }
  }
  const room = await Room.findByIdAndUpdate(
    { _id: roomId },
    { isBooked: false },
    { new: true },
  );
  const bookList = {
    bookedBy: room?.bookedBy,
    bookedAt: room?.bookedAt,
    bookedFor: room?.bookedFor,
    checkIn: room?.checkIn,
    checkOut: checkOut,
  };
  console.log(bookList);
  const updatedRoom = await Room.findByIdAndUpdate(
    { _id: roomId },
    { $push: { bookList: bookList }, bookedAt: null, bookedBy: null },
    { new: true },
  );

  return updatedRoom;
};

export const RoomService = {
  addNewRoom,
  getAvailableRooms,
  bookARoom,
  checkInDate,
  checkOutDate,
};
