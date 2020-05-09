import { fromJS } from "immutable";
import fs from "fs-extra";
import {
  Answers,
  fileObject,
  Middleware,
  Server,
  ServerComposer,
} from "../../types";
import { serverBuilder } from "../server/builder";

import * as path from "path";

import {typescriptBuilder} from "../typescript/builder"
import inquirer from "inquirer"
const writeFile = (rootDir: string) => {
  fs.ensureDirSync(`./${rootDir}`);
  return (file: fileObject) => {
    return fs.writeFile(path.join(rootDir, file.name), file.content);
  };
};
const ui = new inquirer.ui.BottomBar();

export const createNodeApp = async (answers: Answers) => {
  ui.log.write('Creating node application')
  const { whichServer: serverType, appName, shouldUseTs } = answers;
  const writeAppFile = writeFile(appName);

  const packageJson = fromJS({ name: appName, version: "1.0.0" });
  // Todo: better type this
  const aggFiles = (await Promise.all([serverBuilder(answers), typescriptBuilder(answers)])).filter(
    (i) => typeof i !== "undefined"
  );

  const updatedPackageJson = aggFiles.reduce(
    (aggPackageJson, i) => aggPackageJson.mergeDeep(i!.packageJson),
    packageJson
  );

  ui.log.write('Composing files')
  const filesWritten = await Promise.all(aggFiles.map(i => writeAppFile(i!.file)))
  ui.log.write('Composing package json')
  await writeAppFile({
    name: "package.json",
    content: JSON.stringify(updatedPackageJson),
  });
};
