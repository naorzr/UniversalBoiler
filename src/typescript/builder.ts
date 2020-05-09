import { Builder, ServerComposer } from "../../types";
import {TsConfig} from "./index"

export const typescriptBuilder: Builder = async (answers) => {
  const { shouldUseTs } = answers;
  if (!shouldUseTs) {
    return;
  }
  const tsconfig = ((await import(`./${"index"}`)) as {
    default: TsConfig;
  }).default(answers);
  const {devDependencies, dependencies, script, imports, exports} = tsconfig
  const packageJson = {
    devDependencies, dependencies
  };
  return { file: { content: `${imports}\n${script}\n${exports}`, name: "tsconfig.json" }, packageJson };
};
