import { Answers } from "../../../types";
declare const tsComposer: (answers: Answers) => Promise<{
    file: {
        content: string;
        path: string;
    };
    packageJson: any;
}>;
export default tsComposer;
