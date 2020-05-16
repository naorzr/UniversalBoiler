/// <reference types="node" />
import http from "http";
declare const server: (sessionSecret?: string | undefined, reqLimit?: string | undefined) => http.Server;
export default server;
