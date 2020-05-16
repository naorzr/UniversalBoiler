/// <reference types="node" />
import http from "http";
declare const server: (sessionSecret?: string, reqLimit?: string) => http.Server;
export default server;
