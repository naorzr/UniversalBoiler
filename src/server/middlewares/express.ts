import {Middleware} from "../../../types";
import { mergeDeepWith } from "immutable";

const pino: Middleware = {
  javascript: {
    imports: "const pino = require('express-pino-logger')()",
    script: "app.use(pino)",
    dependencies: { "express-pino-logger": "5.0.0" },
    devDependencies: {},
  },
  typescript: {
    imports: "import pino from ('express-pino-logger')",
    script: "app.use(pino())",
    dependencies: { "express-pino-logger": "5.0.0" },
    devDependencies: { "@types/express-pino-logger": "4.0.2" },
  },
};

// Simply Add the middleware here
const middlewares: Array<Middleware> = [pino];

const aggregatedMiddleware = middlewares.reduce(
  (agg, cur) => {
    return mergeDeepWith(
      (oldVal, newVal) => {
        if (typeof oldVal === "string") {
          return oldVal + (oldVal === "" ? "" : "\n") + newVal;
        }
      },
      agg,
      cur
    );
  },
  {
    javascript: {
      imports: "",
      script: "",
      devDependencies: {},
      dependencies: {},
    },
    typescript: {
      imports: "",
      script: "",
      devDependencies: {},
      dependencies: {},
    },
  } as Middleware
);
export default aggregatedMiddleware;
