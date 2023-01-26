import { Router } from 'express';

import { PostsController } from '../../modules/posts/controllers/PostsController';

const postsController = new PostsController();

const postsRoutes = Router();

postsRoutes.get('/', postsController.findMany);
postsRoutes.post('/', postsController.create);
postsRoutes.get('/:id', postsController.findOne);
postsRoutes.delete('/:id', postsController.delete);

export { postsRoutes };
