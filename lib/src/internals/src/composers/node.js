"use strict";
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
exports.createNodeApp = void 0;
var immutable_1 = require("immutable");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path = __importStar(require("path"));
var inquirer_1 = __importDefault(require("inquirer"));
var composer_1 = __importDefault(require("../../../packages/server/composer"));
var composer_2 = __importDefault(require("../../../packages/typescript/composer"));
var index_composer_1 = __importDefault(require("./index-composer"));
var writeFile = function (rootDir) {
    fs_extra_1.default.ensureDirSync("./" + rootDir);
    return function (file) {
        return fs_extra_1.default.writeFile(path.join(rootDir, file.path), file.content);
    };
};
var ui = new inquirer_1.default.ui.BottomBar();
exports.createNodeApp = function (answers) { return __awaiter(void 0, void 0, void 0, function () {
    var serverType, appName, shouldUseTs, writeAppFile, aggFiles, packageJson, filesWritten;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ui.log.write("Creating node application");
                serverType = answers.whichServer, appName = answers.appName, shouldUseTs = answers.shouldUseTs;
                writeAppFile = writeFile(appName);
                return [4 /*yield*/, Promise.all([
                        composer_1.default(answers),
                        composer_2.default(answers),
                        index_composer_1.default(answers),
                    ])];
            case 1:
                aggFiles = (_a.sent()).filter(function (i) { return typeof i !== "undefined"; });
                packageJson = aggFiles
                    .reduce(function (aggPackageJson, i) { return aggPackageJson.mergeDeep(i.packageJson); }, immutable_1.fromJS({}))
                    .mergeDeep({ name: appName, version: "1.0.0" });
                ui.log.write("Composing files");
                return [4 /*yield*/, Promise.all(aggFiles.map(function (i) { return writeAppFile(i.file); }))];
            case 2:
                filesWritten = _a.sent();
                ui.log.write("Composing package json");
                return [4 /*yield*/, writeAppFile({
                        path: "package.json",
                        content: JSON.stringify(packageJson),
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
