import "reflect-metadata";
import "../container"
import "dotenv/config"
import "express-async-errors"

import express from 'express'
import swaggerUi from 'swagger-ui-express';

import { routes } from "./routes";
import { expressAsyncErrors } from "./middlewares/expressAsyncErrors";

import openapi from './openapi.json'

const server = express()

server.use(express.json())

server.use('/', swaggerUi.serve, swaggerUi.setup(openapi))

server.use(routes)

server.use(expressAsyncErrors)

export {
  server
}