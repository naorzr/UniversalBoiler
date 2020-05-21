import { Answers } from "../../../../../types";
import * as path from "path";
import fs from "fs-extra";
import { filesMap } from "../../map";

const prettierComposer = async (answers: Answers) => {
  const { outFilePath: prettierPath, packagePath } = filesMap.prettier;
  const packageJson = await fs.readJson(path.join(packagePath, `package.json`));
  const prettierrc = await fs.readFile(
    path.join(packagePath, `.prettierrc`),
    "utf8"
  );

  return {
    file: { content: prettierrc, finalPath: prettierPath },
    packageJson,
  };
};

export default prettierComposer;
