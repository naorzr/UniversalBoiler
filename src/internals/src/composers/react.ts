import { ChildProcess, exec } from "child_process";
import inquirer from "inquirer";
import util from "util";
import { asPromise, withLogs } from "../utils";

const execAsync = util.promisify(exec);
const ui = new inquirer.ui.BottomBar();

export const createReactApp = ({
  shouldUseTs,
  appName,
}: {
  shouldUseTs: boolean;
  appName: string;
}) => {
  const cmd = `npx create-react-app ${appName} ${
    shouldUseTs ? "--template typescript" : ""
  }`;
  const process = exec(cmd);
  const processWithLogs = withLogs(process);
  return asPromise(processWithLogs);
};
