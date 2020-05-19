import { asPromise } from "../src/internals/src/utils";
import { execSync } from "child_process";
import fs from "fs-extra";
import * as path from "path";

export const buildFold = path.resolve(__dirname,"../lib");

(() => {
  execSync(`rimraf -r ${buildFold} && tsc --noEmit false`);
  const src = path.join(__dirname, "../src", "packages");
  const dest = path.join(buildFold, "packages");
  fs.copySync(src, dest, {
    filter: (src, dest) => {
      if (src.includes("node_modules") || src.includes(".log")) {
        return false;
      }
      return true;
    },
  });
})();
