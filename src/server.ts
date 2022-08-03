// packages
// import 'dotenv/config';
require('dotenv').config()
// additional
import App from './app';
// controller
import AuthenticationController from './auth/auth.controller';
import ChildrenController from './children/children.controller';
import CustomerController from './customer/customer.controller';

// for cert 
import * as http from "http"

// create express application
const app = new App(
  [
    new AuthenticationController(),
    new ChildrenController(),
    new CustomerController()
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