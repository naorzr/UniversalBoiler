"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalFilesMap = void 0;
// Separating it seems like a better idea then passing fileType.. better to refactor when plain js would be supported
exports.finalFilesMap = {
    server: function (fileType) {
        if (fileType === void 0) { fileType = "ts"; }
        return ({
            path: "./server." + fileType,
        });
    },
    tsconfig: function () { return ({ path: "./tsconfig.json" }); },
    index: function (fileType) {
        if (fileType === void 0) { fileType = "ts"; }
        return ({ path: "./index." + fileType });
    },
};
