import { Answers } from "../../../types";
declare const serverComposer: (answers: Answers) => Promise<{
    file: {
        content: string;
        name: string;
    };
    packageJson: any;
}>;
export default serverComposer;
