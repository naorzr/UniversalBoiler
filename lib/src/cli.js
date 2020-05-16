#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var child_process_1 = require("child_process");
var path = __importStar(require("path"));
var react_1 = require("./internals/src/composers/react");
var node_1 = require("./internals/src/composers/node");
var utils_1 = require("./internals/src/utils");
var ui = new inquirer_1.default.ui.BottomBar();
var shouldUseTs = function () {
    return inquirer_1.default.prompt({
        type: "confirm",
        message: "Do you want to use typescript?",
        name: "shouldUseTs",
    });
};
var projectType = function () {
    return inquirer_1.default.prompt({
        type: "list",
        message: "What project are you creating?",
        name: "projectType",
        choices: [{ name: "node" }, { name: "react" }],
    });
};
var whichServer = function () {
    return inquirer_1.default.prompt({
        type: "list",
        message: "Which server do you prefer to use?",
        name: "whichServer",
        choices: [{ name: "express" }],
    });
};
var appName = function () {
    return inquirer_1.default.prompt({
        type: "input",
        message: "What is the app name?",
        name: "appName",
    });
};
// Todo: Rewrite this entire thing and better type this
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var _appName, _projectType, _shouldUseTs, answer, _a, _b, _c, childProcess, childProcessWithLogs;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, appName()];
                case 1:
                    _appName = _d.sent();
                    return [4 /*yield*/, projectType()];
                case 2:
                    _projectType = _d.sent();
                    return [4 /*yield*/, shouldUseTs()];
                case 3:
                    _shouldUseTs = _d.sent();
                    answer = __assign(__assign(__assign({}, _appName), _projectType), _shouldUseTs);
                    if (!(answer.projectType === "react")) return [3 /*break*/, 5];
                    return [4 /*yield*/, react_1.createReactApp(answer)];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 9];
                case 5:
                    if (!(answer.projectType === "node")) return [3 /*break*/, 9];
                    _a = node_1.createNodeApp;
                    _b = [__assign({}, answer)];
                    _c = {};
                    return [4 /*yield*/, whichServer()];
                case 6: return [4 /*yield*/, _a.apply(void 0, [__assign.apply(void 0, _b.concat([(_c.whichServer = (_d.sent()).whichServer, _c)]))])];
                case 7:
                    _d.sent();
                    childProcess = child_process_1.exec("npm i", {
                        cwd: path.join(process.cwd(), _appName.appName),
                    });
                    childProcessWithLogs = utils_1.withLogs(childProcess);
                    ui.log.write("Installing Packages");
                    return [4 /*yield*/, utils_1.asPromise(childProcessWithLogs)];
                case 8:
                    _d.sent();
                    ui.log.write("All done!");
                    _d.label = 9;
                case 9: return [2 /*return*/, process.exit(0)];
            }
        });
    });
})();
