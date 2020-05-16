import { Answers, Composer } from "../../../../../types";
import { finalFilesMap } from "../../map";
import * as path from "path";

const indexComposer: Composer = async (answers: Answers) => {
  const fileType = "ts";
  // Todo: this entire thing is akward.. better rewrite
  const serverPath = finalFilesMap.server(fileType).indexImportPath;
  const content = `
   import server from '${serverPath}'
    
   const port = process.env.PORT || 3000
   server().listen(port, () => console.log(\`App is listening on localhost:\${port}\`))
  `;

  const indexFilePath = finalFilesMap.index(fileType).path;
  const buildScript = fileType === "ts" ? { build: "tsc --noEmit false" } : {};
  const packageJson = {
    main: indexFilePath,
    scripts: {
      start: `${fileType === "ts" ? "ts-node" : "node"} ${indexFilePath}`,
      ...buildScript,
    },
  };
  return { file: { content, path: indexFilePath }, packageJson };
};

export default indexComposer;
