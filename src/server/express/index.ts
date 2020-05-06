import {ServerComposer} from "../../../types"

const express: ServerComposer = (middleware) => ({
  javascript: {
    imports: `
  const express = require("express");
  const http = require('http')
  const cookieParser = require("cookie-parser");
  ${middleware?.javascript.imports}
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
  ${middleware?.javascript.script}
  const server = http.createServer(app)
  return server
}
`,
    devDependencies: {
      ...(middleware?.javascript.devDependencies || {}),
    },
    dependencies: {
      "cookie-parser": "^1.4.5",
      express: "^4.17.1",
      ...(middleware?.typescript.dependencies || {}),
    },
  },
  typescript: {
    imports: `
  import express from "express";
  import http from 'http'
  import cookieParser from "cookie-parser";
  ${middleware?.typescript.imports}
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
  ${middleware?.typescript.script}
  const server = http.createServer(app)
  return server
}
  `,
    devDependencies: {
      "@types/cookie-parser": "^1.4.2",
      ...(middleware?.typescript.devDependencies || {}),
    },
    dependencies: {
      "cookie-parser": "^1.4.5",
      express: "^4.17.1",
      ...(middleware?.typescript.dependencies || {}),
    },
  },
});
export default express;
