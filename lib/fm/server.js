"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_pino_logger_1 = __importDefault(require("express-pino-logger"));
var server = function (sessionSecret, reqLimit) {
    if (sessionSecret === void 0) { sessionSecret = "secret"; }
    if (reqLimit === void 0) { reqLimit = "100kb"; }
    var app = express_1.default();
    app.use(express_1.default.json({ limit: reqLimit }));
    app.use(express_1.default.urlencoded({
        extended: true,
        limit: reqLimit,
    }));
    app.use(cookie_parser_1.default(sessionSecret));
    app.use(express_pino_logger_1.default());
    var server = http_1.default.createServer(app);
    return server;
};
exports.default = server;
