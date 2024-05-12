import { Router } from 'express';
import { RoomController } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Rooms
 *  description: Room management
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get available rooms
 *     description: Returns a list of available rooms
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', RoomController.getAvailableRooms);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Add a new room
 *     description: Add a new room to the system
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               bedCount:
 *                 type: integer
 *               roomType:
 *                 type: string
 *                 enum: [single, double, triple, quad]
 *               price:
 *                 type: number
 *               breakfastIncluded:
 *                 type: boolean
 *               dinnerIncluded:
 *                 type: boolean
 *               lunchIncluded:
 *                 type: boolean
 *               roomQuality:
 *                 type: string
 *                 enum: [normal, deluxe, super deluxe]
 *               isBooked:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomSchema'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/', auth(USER_ROLE.admin), RoomController.addNewRoom);
/**
 * @swagger
 * /rooms/book:
 *   post:
 *     summary: Book a room
 *     description: Admin can book a room for a user or User can book a room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Room booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomSchema'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.post(
  '/book',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RoomController.bookARoom,
);

/**
 * @swagger
 * /rooms/check-in:
 *   post:
 *     summary: Check-in to a room
 *     description:  User can check-in to a room
 *
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Checked-in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomSchema'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal server error
 */

router.post(
  '/check-in',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RoomController.checkInDate,
);
/**
 * @swagger
 * /rooms/check-out:
 *   post:
 *     summary: Check-out from a room
 *     description: Check-out from a booked room . Checkout User data will be added to the bookedList
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *
 *     responses:
 *       '200':
 *         description: Checked-out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal server error
 */

//issue with check-out
router.post(
  '/check-out',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RoomController.checkOutDate,
);

/**
 * @swagger
 * /rooms/cancel-booking:
 *  patch:
 *   summary: Cancel booking
 *   description: Cancel a booked room
 *   tags: [Rooms]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             roomId:
 *               type: string
 *   responses:
 *     '200':
 *       description: Booking canceled successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     '400':
 *       description: Bad request
 *     '401':
 *       description: Unauthorized
 *     '404':
 *       description: Room not found
 *     '500':
 *       description: Internal server error
 */
router.patch(
  '/cancel-booking',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RoomController.cancelBooking,
);

export const roomRoutes = router;
