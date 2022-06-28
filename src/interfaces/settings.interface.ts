import Printer from "printer/printer.interface";

export interface Settings {
  Application: {
    token: string[];
    printer : Array<{
      token: string;
      printer: Printer
    }>
  };
}