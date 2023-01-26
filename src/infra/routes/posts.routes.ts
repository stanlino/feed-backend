import { Router } from 'express';

import { PostsController } from '../../modules/posts/controllers/PostsController';

const postsController = new PostsController();

const postsRoutes = Router();

postsRoutes.get('/:page', postsController.findMany);
postsRoutes.post('/', postsController.create);
postsRoutes.get('/:user/:id', postsController.findOne);
postsRoutes.delete('/:id', postsController.delete);

export { postsRoutes };
