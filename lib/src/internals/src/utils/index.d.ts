/// <reference types="node" />
import { ChildProcess } from "child_process";
export declare const asPromise: (child: ChildProcess) => Promise<unknown>;
export declare const withLogs: (child: ChildProcess) => ChildProcess;
