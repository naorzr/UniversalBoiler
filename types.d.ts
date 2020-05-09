export type dependancy = Record<string, string>;

export interface PackageUnit {
  imports: string;
  script: string;
  devDependencies: dependancy;
  dependencies: dependancy;
}

export interface Server {
  js: PackageUnit;
  ts: PackageUnit;
}

export interface fileObject {
  content: string;
  name: string;
}

export type Builder = (
  answers: Answers
) => Promise<undefined | {
  file: fileObject;
  packageJson: Record<string,any>;
}> ;
export type fileType = "ts" | "js";

export type ServerComposer = (middleware?: Middleware) => Server;
export interface Answers {
  appName: any;
  whichServer: any;
  projectType: any;
  shouldUseTs: any;
}
export interface Middleware {
  js: PackageUnit;
  ts: PackageUnit;
}
