import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import * as PrinterPersistor from "../db/PrinterPersistor";
import * as jwt from "jsonwebtoken";
const { getPrinters } = require("pdf-to-printer");

class PrinterController implements Controller {
  public path = "/printer";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.mapPrinterToSession);
    this.router.get(
      `${this.path}/hasPrefPrinter`,
      authMiddleware,
      this.hasPreferedPrinter
    );
    this.router.get(`${this.path}/getPrinter`, authMiddleware, this.getPrinter);
  }

  private getPrinter = async (request: Request, response: Response) => {
    getPrinters().then((printer: Array<{ deviceId: string; name: string }>) =>
      response.json(
        printer.filter(
          (ptr) => ptr.name.startsWith("D") || ptr.name.startsWith("1")
        )
      )
    );
  };

  private mapPrinterToSession = async (
    request: Request,
    response: Response
  ) => {
    let payload: any = jwt.verify(
      request.headers["authorization"].split(" ")[1],
      "iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123"
    );

    const username: string = payload.username;
    console.log(`Received Username: ${username}`);

    const printerName: string = request.body.name;
    const printerIp: string | undefined = request.body.ip;
    console.log(`Received Printer: ${printerName} with ip: ${printerIp}`);

    // update settings in PrinterPersistor
    let rtn = PrinterPersistor.setPrinterToUsername(username, {
      name: printerName,
      ip: printerIp,
    });

    response.json(rtn);
  };

  private hasPreferedPrinter = async (request: Request, response: Response) => {
    let payload: any = jwt.verify(
      request.headers["authorization"].split(" ")[1],
      "iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123"
    );

    const username: string = payload.username;
    console.log(`Received Username: ${username}`);

    let printers: PrinterPersistor.PrinterEntry[] =
      PrinterPersistor.readPrinterSettings().printers;

    response.json(printers.find((x) => x.username === username));
  };

}

export default PrinterController;
