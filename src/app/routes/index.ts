import { Router } from 'express';
import { AuthRoute } from '../Modules/Auth/auth.routes';
import { roomRoutes } from '../Modules/Rooms/room.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    router: AuthRoute,
  },
  {
    path: '/rooms',
    router: roomRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
