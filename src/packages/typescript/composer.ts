import { Answers } from "../../../types";
import fs from "fs-extra";
import * as path from "path";

const tsComposer = async (answers: Answers) => {
  const packageJson = await fs.readJson(path.join(__dirname, `package.json`));
  const tsconfig = await fs.readFile(
    path.join(__dirname, `tsconfig.json`),
    "utf8"
  );

  return {
    file: { content: tsconfig, name: `tsconfig.json` },
    packageJson,
  };
};

export default tsComposer;
