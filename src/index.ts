import inquirer from "inquirer";
import {createReactApp} from "./composer/react"
import {createNodeApp} from "./composer/node"

const shouldUseTs = () => {
  return inquirer.prompt({
    type: "confirm",
    message: "Do you want to use typescript?",
    name: "shouldUseTs",
  });
};

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
}


const appName = () => {
  return inquirer.prompt({
    type: "input",
    message: "What is the app name?",
    name: "appName",
  });
};

(async function () {
  const _appName = await appName();
  const _projectType = await projectType();
  const _shouldUseTs = await shouldUseTs();
  const answer = { ..._appName, ..._projectType, ..._shouldUseTs };

  if (answer.projectType === "react") {
    createReactApp(answer);
  } else if(answer.projectType === 'node'){
    const {whichServer: server} = await whichServer()

    createNodeApp({...answer, server})
    console.log("typeOfProject1", {...answer, server});
  }
  console.log("typeOfProject2", answer);
})();
