import { Router } from 'express';

import { sessionsRoutes } from './auth.routes';
import { pingRoutes } from './ping.route';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use(pingRoutes);

routes.use('/users', usersRoutes);
routes.use('/auth', sessionsRoutes);

export { routes };
