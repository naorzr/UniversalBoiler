"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLogs = exports.asPromise = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var ui = new inquirer_1.default.ui.BottomBar();
exports.asPromise = function (child) {
    return new Promise(function (resolve, reject) {
        child.addListener('error', function (code, signal) {
            console.log('ChildProcess error', code, signal);
            reject(code);
        });
        child.addListener('exit', function (code, signal) {
            if (code === 0) {
                resolve(code);
            }
            else {
                console.log('ChildProcess error', code, signal);
                reject(code);
            }
        });
    });
};
exports.withLogs = function (child) {
    var _a, _b, _c;
    (_a = child.stdin) === null || _a === void 0 ? void 0 : _a.pipe(ui.log);
    (_b = child.stdout) === null || _b === void 0 ? void 0 : _b.pipe(ui.log);
    (_c = child.stderr) === null || _c === void 0 ? void 0 : _c.pipe(ui.log);
    return child;
};
