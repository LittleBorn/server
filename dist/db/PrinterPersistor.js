"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPrinterToUsername = exports.readPrinterSettings = exports.writePrinterSettings = void 0;
const fs = require("fs");
// Settings
/**
 * writeSettings
 * Writes the settings to the database and checks systems for activity
 * @param {Settings} setting Settings Object
 * @returns {boolean} Returns if the operation was successfull
 */
function writePrinterSettings(setting) {
    try {
        fs.writeFileSync('printers.json', JSON.stringify(setting));
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.writePrinterSettings = writePrinterSettings;
/**
 * readSettings
 * Reads the settings from the databse
 * @returns {Settings} Return the Settings as an Object
 */
function readPrinterSettings() {
    if (!fs.existsSync('printers.json')) {
        fs.writeFileSync('printers.json', JSON.stringify({ printers: [] }));
    }
    const settings = JSON.parse(fs.readFileSync('printers.json').toString());
    return settings;
}
exports.readPrinterSettings = readPrinterSettings;
function setPrinterToUsername(username, printer) {
    let settings = readPrinterSettings();
    if (!settings.printers) {
        writePrinterSettings({
            printers: []
        });
    }
    // refresh settings
    settings = readPrinterSettings();
    // search for existing token in printer array
    let isInArray = (settings.printers.find(printr => printr.username === username) !== undefined);
    if (isInArray) {
        // remove old entry
        removePrinterByUsername(username);
    }
    // refresh settings 
    settings = readPrinterSettings();
    let arr = [...settings.printers, { username, printer }];
    // append printer array
    writePrinterSettings(Object.assign(Object.assign({}, settings), { printers: arr }));
    settings = readPrinterSettings();
    return settings.printers.find(x => x.username == username);
}
exports.setPrinterToUsername = setPrinterToUsername;
function removePrinterByUsername(username) {
    // create empty array if it doesn´t exist
    if (!readPrinterSettings().printers) {
        writePrinterSettings(Object.assign(Object.assign({}, readPrinterSettings()), { printers: [] }));
    }
    const amount = readPrinterSettings().printers.length;
    const printer = readPrinterSettings().printers.filter((x) => x.username !== username);
    const settings = readPrinterSettings();
    settings.printers = printer;
    writePrinterSettings(settings);
    const amountNew = readPrinterSettings().printers.length;
    if (amountNew == (amount - 1)) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=PrinterPersistor.js.map