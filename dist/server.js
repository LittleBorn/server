"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// packages
// import 'dotenv/config';
require('dotenv').config();
// additional
const app_1 = require("./app");
// controller
const authentication_controller_1 = require("./authentication/authentication.controller");
const guest_controller_1 = require("./guest/guest.controller");
// for cert
const http = require("http");
// create express application
const app = new app_1.default([
    new authentication_controller_1.default(),
    new guest_controller_1.default(),
]);
// returns app instance
const server = app.listen();
const httpServer = http.createServer(server);
const port = 5000;
httpServer.listen(port);
console.log("---------------------------------------------------");
console.log(`HTTP-Server started at http://localhost:${port}`);
console.log("---------------------------------------------------");
//# sourceMappingURL=server.js.map