import fs from "fs-extra";
import { buildFold } from "./build";
import * as path from "path";
import { execSync } from "child_process";

const rootDir = path.join(__dirname, "../");
const includePackageJson = () => {
  const packageJson = Object.assign(
    fs.readJsonSync(path.join(rootDir, "package.json")),
    {
      main: "./cli.js",
      types: "./cli.d.ts",
      bin: {
        "universal-boiler": "./cli.js",
      },
      scripts: undefined,
      private: false,
      workspaces: undefined,
    }
  );
  fs.writeJsonSync(path.join(buildFold, "package.json"), packageJson);
  return packageJson;
};

const includeReadme = () => {
  fs.copySync(
    path.join(rootDir, "readme.md"),
    path.join(buildFold, "readme.md")
  );
};

// Todo: can be better optimized without the sync
const pack = () => {
  includePackageJson();
  includeReadme();
  execSync(`cd ${buildFold} && npm pack`);
};

pack();
// const publish = () => {
//     pack();
//     execSync(`cd ${buildFold} && npm publish`)
// }
//
// publish()
