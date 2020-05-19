import fs from "fs-extra";
import { buildFold } from "./build";
import * as path from "path";
import { execSync } from "child_process";

const createPackageJson = () => {
  const packageJson = Object.assign(
    fs.readJsonSync(path.join(__dirname, "../package.json")),
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
  return packageJson
};

const pack = () => {
  const packageJson = createPackageJson();
  const {name, version} = packageJson
  execSync(`cd ${buildFold} && npm pack`);
  return `${name}-${version}.tgz`
};

pack()
// const publish = () => {
//     pack();
//     execSync(`cd ${buildFold} && npm publish`)
// }
//
// publish()