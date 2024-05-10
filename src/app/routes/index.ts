import { Router } from 'express';
import { AuthRoute } from '../Modules/Auth/auth.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    router: AuthRoute,
  }
];
modulesRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
