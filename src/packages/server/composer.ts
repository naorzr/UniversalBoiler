import { Answers } from "../../../types";
import fs from "fs-extra";
import * as path from "path";
import { finalFilesMap } from "internals/src/map";

const serverComposer = async (answers: Answers) => {
  const { whichServer: serverType, appName } = answers;

  const fileType = "ts";
  const { path: serverPath } = finalFilesMap.server(fileType);
  // Todo: no need to wait for these separately, can be optimized.
  const server = await fs.readFile(
    path.join(__dirname, serverType, `index.${fileType}`),
    "utf8"
  );
  const packageJson = await fs.readJson(
    path.join(__dirname, serverType, `package.json`)
  );

  return {
    file: { content: server, path: serverPath },
    packageJson,
  };
};

export default serverComposer;
