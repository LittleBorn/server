import * as fs from "fs"
import Printer from "printer/printer.interface";

export interface PrinterSettings{
    printers: Array<PrinterEntry> 
}

export interface PrinterEntry{
    printer: Printer;
    username: string;
}

// Settings
/**
 * writeSettings
 * Writes the settings to the database and checks systems for activity
 * @param {Settings} setting Settings Object
 * @returns {boolean} Returns if the operation was successfull
 */
 export function writePrinterSettings(setting: PrinterSettings) {

    try {
        fs.writeFileSync('printers.json', JSON.stringify(setting))
        return true;
    } catch {
        return false;
    }

}

/**
 * readSettings
 * Reads the settings from the databse
 * @returns {Settings} Return the Settings as an Object
 */
export function readPrinterSettings(): PrinterSettings {

    if(!fs.existsSync('printers.json')){
        fs.writeFileSync('printers.json', JSON.stringify({printers: []}))
    }

    const settings = JSON.parse(fs.readFileSync('printers.json').toString())

    return settings;

}

export function setPrinterToUsername(username: string, printer: Printer): PrinterEntry{

    let settings = readPrinterSettings();

    if(!settings.printers){
        writePrinterSettings({
            printers: []
        })
    }

    // refresh settings
    settings = readPrinterSettings() 

    // search for existing token in printer array
    let isInArray: boolean = (settings.printers.find(printr => printr.username === username) !== undefined)

    if(isInArray){

        // remove old entry
        removePrinterByUsername(username)

    }

    // refresh settings 
    settings = readPrinterSettings() 

    let arr: PrinterEntry[] = [...settings.printers, { username, printer}]

    // append printer array
    writePrinterSettings({
        ...settings,
        printers: arr
    })

    settings = readPrinterSettings()

    return settings.printers.find(x => x.username == username)

}

function removePrinterByUsername(username: string): boolean{

    // create empty array if it doesn´t exist
    if(!readPrinterSettings().printers){
        writePrinterSettings({
            ...readPrinterSettings(),
            printers: []
        })
    }

    const amount = readPrinterSettings().printers.length;

    const printer: PrinterEntry[] = readPrinterSettings().printers.filter((x: PrinterEntry) => x.username !== username);
    const settings: PrinterSettings = readPrinterSettings();
    settings.printers = printer;

    writePrinterSettings(settings);

    const amountNew = readPrinterSettings().printers.length;

    if (amountNew == (amount - 1)) {
        return true;
    } else {
        return false;
    }

}