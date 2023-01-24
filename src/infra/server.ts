import "reflect-metadata";
import "../container"
import "dotenv/config"
import "express-async-errors"

import express from 'express'
import { routes } from "./routes";
import { expressAsyncErrors } from "./middlewares/expressAsyncErrors";

const server = express()

server.use(express.json())

server.use(routes)

server.use(expressAsyncErrors)

export {
  server
}