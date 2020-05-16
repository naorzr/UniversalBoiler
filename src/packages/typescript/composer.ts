import { Answers } from "../../../types";
import fs from "fs-extra";
import * as path from "path";
import {finalFilesMap} from "internals/src/map"

const tsComposer = async (answers: Answers) => {
  const packageJson = await fs.readJson(path.join(__dirname, `package.json`));
  const {path: tsconfigPath} = finalFilesMap.tsconfig()
  const tsconfig = await fs.readFile(
    path.join(__dirname, `tsconfig.json`),
    "utf8"
  );

  return {
    file: { content: tsconfig, path: tsconfigPath },
    packageJson,
  };
};

export default tsComposer;
