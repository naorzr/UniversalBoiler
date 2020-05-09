import {ServerComposer} from "../../../types"

const express: ServerComposer = (middleware) => ({
  js: {
    imports: `
  const express = require("express");
  const http = require('http')
  const cookieParser = require("cookie-parser");
  ${middleware?.js.imports}
    `,
    script: `
  const createServer = (sessionSecret = process.env.SESSION_SECRET, reqLimit = process.env.REQUEST_LIMIT ) => {
  const app = express();

  app.use(express.json({ limit: reqLimit|| "100kb" }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: reqLimit || "100kb",
    })
  );
  app.use(cookieParser(sessionSecret));
  ${middleware?.js.script}
  const server = http.createServer(app)
  return server
}
`,
    devDependencies: {
      ...(middleware?.ts.devDependencies || {}),
    },
    dependencies: {
      "cookie-parser": "^1.4.5",
      express: "^4.17.1",
      ...(middleware?.ts.dependencies || {}),
    },
  },
  ts: {
    imports: `
  import express from "express";
  import http from 'http'
  import cookieParser from "cookie-parser";
  ${middleware?.ts.imports}
    `,
    script: `
  const createServer = (sessionSecret = process.env.SESSION_SECRET, reqLimit = process.env.REQUEST_LIMIT ) => {
  const app = express();

  app.use(express.json({ limit: reqLimit|| "100kb" }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: reqLimit || "100kb",
    })
  );
  app.use(cookieParser(sessionSecret));
  ${middleware?.ts.script}
  const server = http.createServer(app)
  return server
}
  `,
    devDependencies: {
      "@types/cookie-parser": "^1.4.2",
      ...(middleware?.ts.devDependencies || {}),
    },
    dependencies: {
      "cookie-parser": "^1.4.5",
      express: "^4.17.1",
      ...(middleware?.ts.dependencies || {}),
    },
  },
});
export default express;
