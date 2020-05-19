import { Answers } from "../../../../types";
import fs from "fs-extra";
import * as path from "path";
import {finalFilesMap} from "../map"


const tsComposer = async (answers: Answers) => {
  const {finalPath: tsconfigPath, packagePath} = finalFilesMap.tsconfig()
  const packageJson = await fs.readJson(path.join(packagePath, `package.json`));
  const tsconfig = await fs.readFile(
    path.join(packagePath, `tsconfig.json`),
    "utf8"
  );

  return {
    file: { content: tsconfig, finalPath: tsconfigPath },
    packageJson,
  };
};

export default tsComposer;
