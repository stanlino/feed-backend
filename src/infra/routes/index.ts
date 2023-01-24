import { Router } from 'express';

import { pingRoutes } from './ping.route';
import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use(pingRoutes);

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export { routes };
