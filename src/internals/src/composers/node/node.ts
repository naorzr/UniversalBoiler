import { fromJS } from "immutable";
import fs from "fs-extra";
import * as path from "path";
import inquirer from "inquirer";
import { Answers, fileObject } from "../../../../../types";
import serverComposer from "../server";
import tsComposer from "../typescript";
import indexComposer from "./index-composer";

const writeFile = (rootDir: string) => {
  fs.ensureDirSync(`./${rootDir}`);
  return (file: fileObject) => {
    return fs.writeFile(path.join(rootDir, file.finalPath), file.content);
  };
};
const ui = new inquirer.ui.BottomBar();

export const createNodeApp = async (answers: Answers) => {
  ui.log.write("Creating node application");
  const { whichServer: serverType, appName, shouldUseTs } = answers;
  const writeAppFile = writeFile(appName);

  // Todo: better type this
  const aggFiles = (
    await Promise.all([
      serverComposer(answers),
      tsComposer(answers),
      indexComposer(answers),
    ])
  ).filter((i) => typeof i !== "undefined");


  const packageJson = aggFiles
    .reduce(
      (aggPackageJson, i) => aggPackageJson.mergeDeep(i!.packageJson),
      fromJS({})
    )
    .mergeDeep({ name: appName, version: "1.0.0" });

  ui.log.write("Composing files");
  const filesWritten = await Promise.all(
    aggFiles.map((i) => writeAppFile(i!.file))
  );
  ui.log.write("Composing package json");
  await writeAppFile({
    finalPath: "package.json",
    content: JSON.stringify(packageJson),
  });
};
