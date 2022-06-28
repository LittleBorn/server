// packages
// import 'dotenv/config';
require('dotenv').config()
// additional
import App from './app';
// controller
import AuthenticationController from './authentication/authentication.controller';
import GuestController from './guest/guest.controller';

// for cert
import * as http from "http"
import PrinterController from './printer/printer.controller';

// create express application
const app = new App(
  [
    new AuthenticationController(),
    new GuestController(),
    new PrinterController()
  ],
);

// returns app instance
const server = app.listen();

const httpServer = http.createServer(server);
const port = 5000;
httpServer.listen(port);

console.log("---------------------------------------------------");
console.log( `HTTP-Server started at http://localhost:${ port }` );
console.log("---------------------------------------------------");