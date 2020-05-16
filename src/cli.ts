#!/usr/bin/env node
import inquirer from "inquirer";
import { exec } from "child_process";
import * as path from "path";
import { createReactApp } from "./internals/src/composers/react";
import { createNodeApp } from "internals/src/composers/node/node";
import { asPromise, withLogs } from "./internals/src/utils";
const ui = new inquirer.ui.BottomBar();
// const shouldUseTs = () => {
//   return inquirer.prompt({
//     type: "confirm",
//     message: "Do you want to use typescript?",
//     name: "shouldUseTs",
//   });
// };

const projectType = () => {
  return inquirer.prompt({
    type: "list",
    message: "What project are you creating?",
    name: "projectType",
    choices: [{ name: "node" }, { name: "react" }],
  });
};

const whichServer = () => {
  return inquirer.prompt({
    type: "list",
    message: "Which server do you prefer to use?",
    name: "whichServer",
    choices: [{ name: "express" }],
  });
};

const appName = () => {
  return inquirer.prompt({
    type: "input",
    message: "What is the app name?",
    name: "appName",
    default: 'app'
  });
};

// Todo: Rewrite this entire thing and better type this

(async function () {
  const _appName = await appName();
  const _projectType = await projectType();
  // const _shouldUseTs = await shouldUseTs();
  const answer = { ..._appName, ..._projectType, shouldUseTs: true };

  if (answer.projectType === "react") {
    await createReactApp(answer);
  } else if (answer.projectType === "node") {
    await createNodeApp({
      ...answer,
      whichServer: (await whichServer()).whichServer,
    });
    const childProcess = exec(`npm i`, {
      cwd: path.join(process.cwd(), _appName.appName),
    });
    const childProcessWithLogs = withLogs(childProcess);
    ui.log.write(`Installing Packages`);
    await asPromise(childProcessWithLogs);
    ui.log.write(`All done!`);
  }
  return process.exit(0);
})();
