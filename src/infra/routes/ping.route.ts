import { Response, Router } from 'express';

const pingRoutes = Router();

pingRoutes.get('/ping', (_, response: Response) => {
  response.send('pong');
});

export { pingRoutes };
