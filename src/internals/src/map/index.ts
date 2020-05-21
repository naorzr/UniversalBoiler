import * as path from "path";

const pathToPackages = path.resolve(__dirname, "..", "..", "..", "packages");

// Separating it seems like a better idea then passing fileType.. better to refactor when plain js would be supported
export const filesMap = {
  server: {
    outFilePath: `./server.ts`,
    packagePath: path.join(pathToPackages, `server`),
    indexImportPath: "./server",
  },
  tsconfig: {
    outFilePath: `./tsconfig.json`,
    packagePath: path.join(pathToPackages, `typescript`),
  },
  prettier: {
    outFilePath: `./.prettierrc`,
    packagePath: path.join(pathToPackages, `prettier`),
  },
  index: {
    outFilePath: `index.ts`,
  },
};
