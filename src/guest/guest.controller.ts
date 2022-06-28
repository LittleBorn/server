import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import GuestModel from "./guest.model";
import * as fs from "fs";
import { printGuestCard } from "../utils/printerHelper";
import * as jwt from "jsonwebtoken";
import IGuest from "./guest.interface";
import createType from "../interfaces/createType.enum";
import * as loggingHelper from "../utils/loggingHelper"
import { guestValidationMiddleware } from "../middleware/guest.middleware"
import { iacdto } from "interfaces/iacdto.interface";


class GuestController implements Controller {
  public path = "/guest";
  public router = Router();
  private guestModel = new GuestModel();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, guestValidationMiddleware, this.createGuest);
    this.router.post(`${this.path}/expressCreate`, authMiddleware, guestValidationMiddleware,this.expressCreate);
  }

  private createGuest = async (request: Request, response: Response) => {

    const guest: IGuest = request.body;
    console.log(`Try to add User: ${guest.firstName} ${guest.lastName} to the system... (createGuest)`);
    let payload: any = jwt.verify(request.headers["authorization"].split(" ")[1],"iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123");
    const username: string = payload.username;

    const user: iacdto | undefined = await this.guestModel.addUserToIAC({...guest, creator: username});

    if(!user){
      const msg: string = "Das Anlegen des Benutzers auf der IAC-Box war leider nicht erfolgreich. Bitte wenden Sie sich an den zuständigen Administrator, falls dieses Problem wiederholt auftritt."
      loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
      response.json({
        id: 1,
        msg: msg
      });
    }else{
      const msg: string = `Das Anlegen des Benutzers ${guest.firstName} ${guest.lastName} durch: ${payload.username} war erfolgreich! `
      loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
      response.json({
        id: 0,
        msg: msg,
        user: {
          ...user,
          firstName: guest.firstName,
          lastName: guest.lastName,
          creator: username,
          duration: guest.duration
        }
      });
    }
  };

  private expressCreate = async (request: Request, response: Response) => {
    
    const guest: IGuest = request.body;
    console.log(`Try to add User: ${guest.firstName} ${guest.lastName} to the system...(expressCreate)`);

    let payload: any = jwt.verify(request.headers["authorization"].split(" ")[1],"iSLad8oJAOISDAaJAS8ajdaxacASDJ8sjmaklmmsacao38123");
    const username: string = payload.username;

    const user: iacdto | undefined = await this.guestModel.addUserToIAC({...guest, creator: username});
    // const user:iacdto = {error:0,data:{ticket_id:"25",username:"arbguest111",password:"f5xugezn"}}

    if(!user){
      const msg: string = "Das Express-Anlegen des Benutzers auf der IAC-Box war leider nicht erfolgreich. Bitte wenden Sie sich an den zuständigen Administrator, falls dieses Problem wiederholt auftritt."
      loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
      response.json({
        id: 1,
        msg: msg
      });
    }else{

      //todo debug -> print guest card 
      printGuestCard({
        ...user.data,
        firstName: guest.firstName,
        lastName: guest.lastName,
        duration: guest.duration
      }, username);

      const msg: string = `Das Anlegen des Benutzers ${guest.firstName} ${guest.lastName} durch: ${username} war erfolgreich!`
      loggingHelper.log(loggingHelper.LoggingLevel.info, msg);
      response.json({
        id: 0,
        msg: msg,
        user: {
          ...user,
          firstName: guest.firstName,
          lastName: guest.lastName,
          creator: username,
          duration: guest.duration
        }
      });
    }
  };
}

export default GuestController;
