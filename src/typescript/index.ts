import { Answers, PackageUnit } from "../../types";

export type TsConfig = (answers: Answers) => PackageUnit;
const tsconfig: TsConfig = (answers) => ({
  imports: "",
  script: `{
            "compilerOptions": {
                "module": "commonjs",
                "esModuleInterop": true,
                "allowSyntheticDefaultImports": true,
                "target": "es6",
                "noImplicitAny": true,
                ${
                  answers.projectType === "node" ? `"moduleResolution": "node"` : ""
                 },
                 "sourceMap": true,
                 "outDir": "dist",
                 "baseUrl": "."
           },
            "exclude": ["node_modules","dist"]
           }`,
    exports: ``,
  dependencies: {},
  devDependencies: { typescript: "^3.8.3", "ts-node": "^8.10.1" },
});

export default tsconfig;
