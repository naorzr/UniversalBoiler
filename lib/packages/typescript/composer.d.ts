import { Answers } from "../../../types";
declare const tsComposer: (answers: Answers) => Promise<{
    file: {
        content: string;
        name: string;
    };
    packageJson: any;
}>;
export default tsComposer;
