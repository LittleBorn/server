const fs = require("fs");

export enum LoggingLevel {
    error,
    warn,
    info,
    debug,
    none
}

enum LoggingEnv {
    development,
    production
}

export const logMiddleware = async(req: any, res: any, next: any) => {
    const ip: string = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const path: string = req.path;
    processLogEntry(LoggingLevel.info, `Request from: ${ip} on Ressource: ${path}`, LoggingEnv.production);
    next()
}

/**
 * log
 * Function logs depending on the current environment
 * @param {LoggingLevel} level Logginglevel
 * @param {string} msg Data
 */
export function log(level: LoggingLevel, msg: string) {
    processLogEntry(level, msg, LoggingEnv.production);
}

/**
 * processLogEntry
 * Processes Log Entry depending on environment and Log level
 * @param {LoggingLevel} level Logging Level
 * @param {string} msg Data
 * @param {LoggingEnv} env Current Environment
 */
export function processLogEntry(level: LoggingLevel, msg: string, env: LoggingEnv) {

    const timestamp: Date = new Date(Date.now());
    let processedMessage: string;

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
    } else if (env === LoggingEnv.production) {
        writeProduction(processedMessage);
    }else{
        console.log("Please add Environment. Here the log-message: ", processedMessage)
    }

}

/**
 * Handles logging data when env is dev
 * @param msg
 */
function writeDevelopment(msg: string) {
    try {
        fs.appendFileSync(`ARBURG_GWM.log`, msg, "utf8");
        fs.appendFileSync(`ARBURG_GWM.log`, "\n", "utf8");
    } catch {
        console.log("[ERROR] Error occured while logging to file!" + new Date(Date.now()).toUTCString());
    }
}

/**
 * Handles logging data when env is prod
 * @param msg
 */
function writeProduction(msg: string) {
    try {
        fs.appendFileSync(`ARBURG_GWM.log`, msg, "utf8");
        fs.appendFileSync(`ARBURG_GWM.log`, "\n", "utf8");
    } catch {
        console.log("[ERROR] Error occured while logging to file!" + new Date(Date.now()).toUTCString());
    }
}
