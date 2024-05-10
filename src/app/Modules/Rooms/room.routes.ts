import { Router } from 'express';
import { RoomController } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.get('/', RoomController.getAvailableRooms);
router.post('/', auth(USER_ROLE.admin), RoomController.addNewRoom);
router.post('/book', auth(USER_ROLE.user), RoomController.bookARoom);
router.post(
  '/check-in',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RoomController.checkInDate,
);

//issue with check-out
router.post(
  '/check-out',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RoomController.checkOutDate,
);

export const roomRoutes = router;
