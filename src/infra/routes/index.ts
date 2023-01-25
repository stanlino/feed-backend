import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { sessionsRoutes } from './auth.routes';
import { pingRoutes } from './ping.route';
import { profilesRoutes } from './profiles.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use(pingRoutes);

routes.use('/users', usersRoutes);
routes.use('/auth', sessionsRoutes);
routes.use('/profiles', ensureAuthenticated, profilesRoutes);

export { routes };
