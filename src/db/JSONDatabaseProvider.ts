import { Settings } from "../interfaces/settings.interface"
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as jwt from "jsonwebtoken"
var CryptoJS = require("crypto-js");

// Settings
/**
 * writeSettings
 * Writes the settings to the database and checks systems for activity
 * @param {Settings} setting Settings Object
 * @returns {boolean} Returns if the operation was successfull
 */
export function writeSettings(setting: Settings) {

    try {
        fs.writeFileSync('db.json', encrypt(setting))
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
export function readSettings(): Settings {

    if(!fs.existsSync('db.json')){
        fs.writeFileSync('db.json', encrypt({}))
    }

    const settings = decrypt(fs.readFileSync('db.json'))

    return settings;

}



export function addNewToken(username: string): string {
    // const newToken: string = uuidv4();
    const newToken: string = jwt.sign({username}, "iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123")

    // Write new Token to settings
    let settings = readSettings();

    // create empty array if it doesn´t exist
    if(!settings.Application?.token){
        writeSettings({
            ...settings,
            Application: {
                ...settings.Application,
                token: []
            }
        })
    }

    // refresh settings
    settings = readSettings()

    // push new token to settings
    settings.Application.token.push(newToken);
    writeSettings(settings);

    setInterval(() => {
        removeToken(newToken);
    }, 40000000);

    return newToken;
}

export function removeToken(item: string): boolean {

    // create empty array if it doesn´t exist
    if(!readSettings().Application?.token){
        writeSettings({
            ...readSettings(),
            Application: {
                ...readSettings().Application,
                token: []
            }
        })
    }

    const amount = readSettings().Application.token.length;

    const token: string[] = readSettings().Application.token.filter((x:any) => x !== item);
    const settings: Settings = readSettings();
    settings.Application.token = token;

    writeSettings(settings);

    const amountNew = readSettings().Application.token.length;

    if (amountNew == (amount - 1)) {
        return true;
    } else {
        return false;
    }
}

export function encrypt(decr: any): any {

    // todo debug
    return JSON.stringify(decr)

    console.log("ENCRYPT JSON DB")
    let message = JSON.stringify(decr)
    var ciphertext = CryptoJS.AES.encrypt(message, 'secret').toString();
    

    return ciphertext;
}

export function decrypt(encr: any): any {

    // todo debug
    return JSON.parse(encr)
    
    console.log("DECRYPT JSON DB")
    var bytes = CryptoJS.AES.decrypt(encr, 'secret');
    var message = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(message)
}
