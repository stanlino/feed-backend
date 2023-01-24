import { Router } from 'express';

import { SessionsController } from '../../modules/users/controllers/SessionsController';

const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post('/authenticate', sessionsController.authenticate);
sessionsRoutes.post('/refresh-token', sessionsController.refreshToken);

export { sessionsRoutes };
