import { Router } from 'express';

import { UsersController } from '../../modules/users/controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.delete('/', ensureAuthenticated, usersController.delete);

export { usersRoutes };
