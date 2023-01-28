import { Router } from 'express';

import { ProfilesController } from '../../modules/profiles/controllers/ProfilesController';

const profilesController = new ProfilesController();

const profilesRoutes = Router();

profilesRoutes.post('/', profilesController.create);
profilesRoutes.get('/:username', profilesController.findOne);
profilesRoutes.patch('/', profilesController.update);
profilesRoutes.delete('/', profilesController.delete);

export { profilesRoutes };
