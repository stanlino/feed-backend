import 'reflect-metadata';
import '../container';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { expressAsyncErrors } from './middlewares/expressAsyncErrors';
import { notFound } from './middlewares/notFound';
import openapi from './openapi.json';
import { routes } from './routes';

const server = express();

server.use(express.json());

server.use(routes);

server.use(expressAsyncErrors);

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

server.use('*', notFound);

export { server };
