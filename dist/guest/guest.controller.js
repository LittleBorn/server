"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const guest_model_1 = require("./guest.model");
const jwt = require("jsonwebtoken");
const loggingHelper = require("../utils/loggingHelper");
const guest_middleware_1 = require("../middleware/guest.middleware");
class GuestController {
    constructor() {
        this.path = "/guest";
        this.router = express_1.Router();
        this.guestModel = new guest_model_1.default();
        this.createGuest = async (request, response) => {
            const guest = request.body;
            console.log(`Try to add User: ${guest.firstName} ${guest.lastName} to the system... (createGuest)`);
            let payload = jwt.verify(request.headers["authorization"].split(" ")[1], "iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123");
            const username = payload.username;
            const user = await this.guestModel.addUserToIAC(Object.assign(Object.assign({}, guest), { creator: username }));
            if (!user) {
                const msg = "Das Anlegen des Benutzers auf der IAC-Box war leider nicht erfolgreich. Bitte wenden Sie sich an den zuständigen Administrator, falls dieses Problem wiederholt auftritt.";
                loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
                response.json({
                    id: 1,
                    msg: msg
                });
            }
            else {
                const msg = `Das Anlegen des Benutzers ${guest.firstName} ${guest.lastName} durch: ${payload.username} war erfolgreich! `;
                loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
                response.json({
                    id: 0,
                    msg: msg,
                    user: Object.assign(Object.assign({}, user), { firstName: guest.firstName, lastName: guest.lastName, creator: username, duration: guest.duration })
                });
            }
        };
        this.expressCreate = async (request, response) => {
            const guest = request.body;
            console.log(`Try to add User: ${guest.firstName} ${guest.lastName} to the system...(expressCreate)`);
            let payload = jwt.verify(request.headers["authorization"].split(" ")[1], "iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123");
            const username = payload.username;
            const user = await this.guestModel.addUserToIAC(Object.assign(Object.assign({}, guest), { creator: username }));
            // const user:iacdto = {error:0,data:{ticket_id:"25",username:"arbguest111",password:"f5xugezn"}}
            if (!user) {
                const msg = "Das Express-Anlegen des Benutzers auf der IAC-Box war leider nicht erfolgreich. Bitte wenden Sie sich an den zuständigen Administrator, falls dieses Problem wiederholt auftritt.";
                loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
                response.json({
                    id: 1,
                    msg: msg
                });
            }
            else {
                //todo debug -> print guest card 
                const msg = `Das Anlegen des Benutzers ${guest.firstName} ${guest.lastName} durch: ${username} war erfolgreich!`;
                loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
                response.json({
                    id: 0,
                    msg: msg,
                    user: Object.assign(Object.assign({}, user), { firstName: guest.firstName, lastName: guest.lastName, creator: username, duration: guest.duration })
                });
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, auth_middleware_1.default, guest_middleware_1.guestValidationMiddleware, this.createGuest);
        this.router.post(`${this.path}/expressCreate`, auth_middleware_1.default, guest_middleware_1.guestValidationMiddleware, this.expressCreate);
    }
}
exports.default = GuestController;
//# sourceMappingURL=guest.controller.js.map