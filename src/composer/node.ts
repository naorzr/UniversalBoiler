import { fromJS } from "immutable";
import fs from "fs-extra";
import { Middleware, Server, ServerComposer } from "../../types";
export const createNodeApp = async (params: {
  server: string;
  appName: string;
  shouldUseTs: boolean;
}) => {
  const { server: serverType, appName, shouldUseTs } = params;

  const scriptType = shouldUseTs
    ? ("typescript" as const)
    : ("javascript" as const);
  const filePostfix = shouldUseTs ? "ts" : "js";
  const packageJson = fromJS({ name: appName, version: "1.0.0" });
  const middlewares = (await import(`../server/middlewares/${serverType}.ts`))
    .default as Middleware;
  console.log('middlewares',middlewares)
  const server = ((await import(`../server/${serverType}`)) as {
    default: ServerComposer;
  }).default(middlewares);

  const { dependencies, devDependencies, script, imports } = server[scriptType];

  const updatedPackageJson = packageJson.mergeDeep(
    fromJS({ dependencies }),
    fromJS({ devDependencies })
  );


  fs.ensureDirSync(`./${appName}`)
  fs.writeFileSync(
    `./${appName}/package.json`,
    JSON.stringify(updatedPackageJson)
  );
  fs.writeFileSync(`./${appName}/server.${filePostfix}`,imports + "\n" +  script);
};
