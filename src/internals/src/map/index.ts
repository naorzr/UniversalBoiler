import * as path from "path";

// Separating it seems like a better idea then passing fileType.. better to refactor when plain js would be supported
export const finalFilesMap = {
  server: (fileType = "ts") => ({
    path: `./server.${fileType}`,
    indexImportPath: './server'
  }),
  tsconfig: () => ({ path: `./tsconfig.json` }),
  index: (fileType = "ts") => ({ path: `./index.${fileType}` }),
};
