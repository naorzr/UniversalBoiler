import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import pino from 'express-pino-logger'

const server = (
  sessionSecret = process.env.SESSION_SECRET,
  reqLimit = process.env.REQUEST_LIMIT
) => {
  const app = express();

  app.use(express.json({ limit: reqLimit || "100kb" }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: reqLimit || "100kb",
    })
  );
  app.use(cookieParser(sessionSecret));
  app.use(pino())

  const server = http.createServer(app);
  return server;
};

export default server;
