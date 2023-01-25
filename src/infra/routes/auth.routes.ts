import { Router } from 'express';

import { AuthController } from '../../modules/users/controllers/AuthController';

const authController = new AuthController();

const sessionsRoutes = Router();

sessionsRoutes.post('/', authController.authenticate);
sessionsRoutes.post('/refresh-token', authController.refreshToken);

export { sessionsRoutes };
