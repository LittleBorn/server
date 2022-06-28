"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processLogEntry = exports.log = exports.logMiddleware = exports.LoggingLevel = void 0;
const fs = require("fs");
var LoggingLevel;
(function (LoggingLevel) {
    LoggingLevel[LoggingLevel["error"] = 0] = "error";
    LoggingLevel[LoggingLevel["warn"] = 1] = "warn";
    LoggingLevel[LoggingLevel["info"] = 2] = "info";
    LoggingLevel[LoggingLevel["debug"] = 3] = "debug";
    LoggingLevel[LoggingLevel["none"] = 4] = "none";
})(LoggingLevel = exports.LoggingLevel || (exports.LoggingLevel = {}));
var LoggingEnv;
(function (LoggingEnv) {
    LoggingEnv[LoggingEnv["development"] = 0] = "development";
    LoggingEnv[LoggingEnv["production"] = 1] = "production";
})(LoggingEnv || (LoggingEnv = {}));
exports.logMiddleware = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const path = req.path;
    processLogEntry(LoggingLevel.info, `Request from: ${ip} on Ressource: ${path}`, LoggingEnv.production);
    next();
};
/**
 * log
 * Function logs depending on the current environment
 * @param {LoggingLevel} level Logginglevel
 * @param {string} msg Data
 */
function log(level, msg) {
    processLogEntry(level, msg, LoggingEnv.production);
}
exports.log = log;
/**
 * processLogEntry
 * Processes Log Entry depending on environment and Log level
 * @param {LoggingLevel} level Logging Level
 * @param {string} msg Data
 * @param {LoggingEnv} env Current Environment
 */
function processLogEntry(level, msg, env) {
    const timestamp = new Date(Date.now());
    let processedMessage;
    switch (level) {
        case LoggingLevel.debug:
            processedMessage = `[DEBUG] ${msg} at: ${timestamp.toUTCString()}`;
            break;
        case LoggingLevel.error:
            processedMessage = `[ERROR] ${msg} at: ${timestamp.toUTCString()}`;
            break;
        case LoggingLevel.warn:
            processedMessage = `[WARN] ${msg} at: ${timestamp.toUTCString()}`;
            break;
        case LoggingLevel.info:
            processedMessage = `[INFO] ${msg} at: ${timestamp.toUTCString()}`;
            break;
        default:
            processedMessage = `[NONE] ${msg} at: ${timestamp.toUTCString()}`;
            break;
    }
    if (env === LoggingEnv.development) {
        writeDevelopment(processedMessage);
        console.log(processedMessage);
    }
    else if (env === LoggingEnv.production) {
        writeProduction(processedMessage);
    }
    else {
        console.log("Please add Environment. Here the log-message: ", processedMessage);
    }
}
exports.processLogEntry = processLogEntry;
/**
 * Handles logging data when env is dev
 * @param msg
 */
function writeDevelopment(msg) {
    try {
        fs.appendFileSync(`ARBURG_GWM.log`, msg, "utf8");
        fs.appendFileSync(`ARBURG_GWM.log`, "\n", "utf8");
    }
    catch (_a) {
        console.log("[ERROR] Error occured while logging to file!" + new Date(Date.now()).toUTCString());
    }
}
/**
 * Handles logging data when env is prod
 * @param msg
 */
function writeProduction(msg) {
    try {
        fs.appendFileSync(`ARBURG_GWM.log`, msg, "utf8");
        fs.appendFileSync(`ARBURG_GWM.log`, "\n", "utf8");
    }
    catch (_a) {
        console.log("[ERROR] Error occured while logging to file!" + new Date(Date.now()).toUTCString());
    }
}
//# sourceMappingURL=loggingHelper.js.map