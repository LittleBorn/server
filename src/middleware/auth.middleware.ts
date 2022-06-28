import { NextFunction, Response, Request } from 'express';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import * as dbHelper from "../db/JSONDatabaseProvider"

async function authMiddleware(request: Request, response: Response, next: NextFunction) {

  let token = "";

  if(request.headers["authorization"] !== undefined) token = request.headers["authorization"].split(" ")[1]

  try {
    
    let verificationResponse = (dbHelper.readSettings().Application.token.find((item) => item == token) != undefined)
    
    if (verificationResponse) {
      next();
    } else {
      next(new WrongAuthenticationTokenException());
    }
  } catch (error) {
    next(new WrongAuthenticationTokenException());
  }

}

export default authMiddleware;
