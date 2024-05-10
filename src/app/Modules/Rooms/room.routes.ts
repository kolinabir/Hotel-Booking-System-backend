import { Router } from 'express';
import { RoomController } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post('/', auth(USER_ROLE.admin), RoomController.addNewRoom);
router.get('/', RoomController.getAvailableRooms);

export const roomRoutes = router;
