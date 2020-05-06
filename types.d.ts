
export type dependancy = Record<string, string>;

export interface Package {
  imports: string;
  script: string;
  devDependencies: dependancy;
  dependencies: dependancy;
}

export interface Server {
  javascript: Package;
  typescript: Package;
}

export type ServerComposer = (middleware?: Middleware) => Server;

export interface Middleware {
  typescript: Package;
  javascript: Package;
}
