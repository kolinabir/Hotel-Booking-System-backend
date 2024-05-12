import { Router } from 'express';
import { AuthController } from './auth.controller';
import { UserController } from '../User/user.controller';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validations';
import auth from '../../middlewares/auth';
import { UserValidationSchema } from '../User/user.validation';
const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication and Authorization
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: userId of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - userId
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change user's password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post(
  '/change-password',
  auth(USER_ROLE.admin),
  AuthController.changePassword,
);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post(
  '/register',
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserController.createUser,
);
/**
 * @swagger
 * /auth/check-auth:
 *   get:
 *     summary: Check user's authentication
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  '/check-auth',
  auth(USER_ROLE.admin),
  AuthController.checkAuthentication,
);

export const AuthRoute = router;
