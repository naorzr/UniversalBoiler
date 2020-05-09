import { Builder, ServerComposer } from "../../types";
import {TsConfig} from "./index"

export const typescriptBuilder: Builder = async (answers) => {
  const { shouldUseTs } = answers;
  if (!shouldUseTs) {
    return;
  }
  const tsconfig = ((await import(`./${"index"}.ts`)) as {
    default: TsConfig;
  }).default(answers);
  const {devDependencies, dependencies, script, imports} = tsconfig
  const packageJson = {
    devDependencies, dependencies
  };
  return { file: { content: `${imports}\n${script}`, name: "tsconfig.json" }, packageJson };
};
