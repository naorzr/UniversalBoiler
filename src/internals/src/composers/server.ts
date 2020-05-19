import { Answers } from "../../../../types";
import fs from "fs-extra";
import * as path from "path";
import {finalFilesMap} from "../map"


const serverComposer = async (answers: Answers) => {
  const { whichServer: serverType, appName } = answers;

  const fileType = "ts";
  const { finalPath: serverPath, packagePath } = finalFilesMap.server(fileType);
  // Todo: no need to wait for these separately, can be optimized.
  const server = await fs.readFile(
    path.join(packagePath, serverType, `index.${fileType}`),
    "utf8"
  );
  const packageJson = await fs.readJson(
    path.join(packagePath, serverType, `package.json`)
  );

  return {
    file: { content: server, finalPath: serverPath },
    packageJson,
  };
};

export default serverComposer;
