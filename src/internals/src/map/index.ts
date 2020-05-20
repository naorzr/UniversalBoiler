import * as path from "path";

const pathToPackages = path.resolve(__dirname,"..", "..", "..", "packages");
console.log('pathToPackages',pathToPackages)
// Separating it seems like a better idea then passing fileType.. better to refactor when plain js would be supported
export const finalFilesMap = {
  server: (fileType = "ts") => ({
    finalPath: `./server.${fileType}`,
    packagePath: path.join(pathToPackages, `server`),
    indexImportPath: "./createServer",
  }),
  tsconfig: () => ({
    finalPath: `./tsconfig.json`,
    packagePath: path.join(pathToPackages, `typescript`),
  }),
  index: (fileType = "ts") => ({
    finalPath: `index.${fileType}`,
  }),
};
