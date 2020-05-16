import {ChildProcess} from "child_process"
import inquirer from "inquirer"
const ui = new inquirer.ui.BottomBar();
export const asPromise = function (child: ChildProcess) {
    return new Promise((resolve, reject) => {
        child.addListener('error', (code: any, signal: any) => {
            console.log('ChildProcess error', code, signal);
            reject(code);
        });
        child.addListener('exit', (code: any, signal:any) => {
            if (code === 0) {
                resolve(code);
            } else {
                console.log('ChildProcess error', code, signal);
                reject(code);
            }
        });
    });
};

export const withLogs = (child: ChildProcess) => {
    child.stdin?.pipe(ui.log)
    child.stdout?.pipe(ui.log);
    child.stderr?.pipe(ui.log);
    return child
}