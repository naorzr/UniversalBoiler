import {exec} from "child_process"
import inquirer from "inquirer"

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
    process.stdout?.pipe(ui.log);
    process.stderr?.pipe(ui.log);
};