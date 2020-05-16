import { Answers } from "../../../types";
declare const serverComposer: (answers: Answers) => Promise<{
    file: {
        content: string;
        path: string;
    };
    packageJson: any;
}>;
export default serverComposer;
