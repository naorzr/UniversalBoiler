import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import pino from "express-pino-logger";

const server = (sessionSecret = "secret", reqLimit = "100kb") => {
  const app = express();

  app.use(express.json({ limit: reqLimit }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: reqLimit,
    })
  );
  app.use(cookieParser(sessionSecret));
  app.use(pino());

  const server = http.createServer(app);
  return server;
};

export default server;
