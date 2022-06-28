import * as PDFDocument from "pdfkit"
import * as fs from "fs"
import * as PrinterPersistor from "../db/PrinterPersistor"
import { v4 as uuidv4 } from 'uuid';
const { print } = require("pdf-to-printer")

interface GuestCard {
    firstName: string;
    lastName: string;
    ticket_id: string;
    username: string;
    password: string;
    duration: string;
}


export const printGuestCard = (guest: GuestCard, username: string): Promise<boolean> => {

    return new Promise((res, rej) => {

        // get printer to username
        let printers: PrinterPersistor.PrinterEntry[] = PrinterPersistor.readPrinterSettings().printers;
        let prefPrinter: PrinterPersistor.PrinterEntry = printers.find(x => x.username === username)

        // get printer ip/name or choose default
        const printerIdent: string = prefPrinter.printer.name || "D035PS";

        console.log(guest)
        var someDate = new Date();
        var numberOfDaysToAdd = Number.parseInt(guest.duration);
        console.log("Duration:"+guest.duration)
        let result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        const DATE = `${someDate.toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' })}`;
        

        //make a PDF document
        var doc = new PDFDocument({ margin: 0, size: [980, 581], pdfVersion: "1.3" });

        const Y1: number = 95;
        const Y2: number = 235;
        const LB: number = 60;

        doc.fontSize(45);
        doc.font('Helvetica-Bold').text("ARBURG GuestWifi", 10, Y1);

        doc.fontSize(45);
        doc.font('Helvetica-Bold').text(`Name: `, 10, Y2)
        doc.font('Helvetica').text(`${guest.firstName} ${guest.lastName}`, 160, Y2);

        doc.font('Helvetica-Bold').text(`Benutzername:`, 10, Y2 + LB);
        doc.font('Helvetica').text(`${guest.username}`, 350, Y2 + LB);

        doc.font('Helvetica-Bold').text(`Passwort:`, 10, Y2 + (LB * 2));
        doc.font('Helvetica').text(`${guest.password}`, 230, Y2 + (LB * 2));

        doc.fontSize(30);
        doc.font('Helvetica').text(`Bitte bewahren Sie diese Karte bis zum `, 10, Y2 + (LB * 3));
        doc.font('Helvetica').text(`Ablauf der Gültigkeit (${DATE}) auf.`, 10, Y2 + (LB * 3.6));

        doc.image('wifi_symb_b.png', 700, Y2 - 20,
            { fit: [200, 200], align: 'center', valign: 'center' }
        )

        const printPath: string = `src/prints/${username}-${uuidv4()}.pdf`
        doc.pipe(fs.createWriteStream(printPath));

        var buffers: any[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', function () {

            console.log("Printing on Printer"+ printerIdent)

            const options = {
                printer: `${printerIdent}`,
                orientation: "landscape",
                scale: "fit"
            }

            print(printPath, options)
            .then(() => { console.log("Printing was successfull..."); res(true) })
            .catch(() => {console.log("Error while printing..."); res(false)})
          
        });

        doc.end()

    })
}