"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReactApp = void 0;
var child_process_1 = require("child_process");
var inquirer_1 = __importDefault(require("inquirer"));
var util_1 = __importDefault(require("util"));
var utils_1 = require("../utils");
var execAsync = util_1.default.promisify(child_process_1.exec);
var ui = new inquirer_1.default.ui.BottomBar();
exports.createReactApp = function (_a) {
    var shouldUseTs = _a.shouldUseTs, appName = _a.appName;
    var cmd = "npx create-react-app " + appName + " " + (shouldUseTs ? "--template typescript" : "");
    var process = child_process_1.exec(cmd);
    var processWithLogs = utils_1.withLogs(process);
    return utils_1.asPromise(processWithLogs);
};
