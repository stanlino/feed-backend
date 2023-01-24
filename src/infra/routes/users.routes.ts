import { Router } from 'express';

import { UsersController } from '../../modules/users/controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post('/create', usersController.create);
usersRoutes.post('/delete', ensureAuthenticated, usersController.delete);

export { usersRoutes };
