import {
  Answers,
  Builder,
  fileObject,
  fileType,
  Middleware,
  ServerComposer,
} from "../../types";
import { fromJS } from "immutable";

export const serverBuilder: Builder = async (answers) => {
  const { whichServer: serverType, appName, shouldUseTs } = answers;

  const fileType = shouldUseTs ? ("ts" as const) : ("js" as const);
  const middlewares = (await import(`./middlewares/${serverType}`))
    .default as Middleware;
  const server = ((await import(`./${serverType}`)) as {
    default: ServerComposer;
  }).default(middlewares);

  const { dependencies, devDependencies, script, imports } = server[fileType];
  const packageJson = fromJS({ dependencies, devDependencies });
  const fileContent = imports + "\n" + script + "\n";
  return {
    file: { content: fileContent, name: `server.${fileType}` },
    packageJson,
  };
};
