import { Answers } from "../../../types";
import fs from "fs-extra";
import * as path from "path";

const serverComposer = async (answers: Answers) => {
  const { whichServer: serverType, appName } = answers;

  const fileType = "ts";
  // Todo: no need to wait for these separately, can be optimized.
  const server = await fs.readFile(
    path.join(__dirname, serverType, `index.${fileType}`),
    "utf8"
  );
  const packageJson = await fs.readJson(
    path.join(__dirname, serverType, `package.json`)
  );

  return {
    file: { content: server, name: `server.${fileType}` },
    packageJson,
  };
};

export default serverComposer;
