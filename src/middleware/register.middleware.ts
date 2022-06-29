import { NextFunction, Response, Request } from 'express';
import InvalidArgumentException from '../exceptions/InvalidArgumentException';

async function registerMiddleware(request: Request, response: Response, next: NextFunction) {

  const user = request.body;

  if(typeof user.email === 'undefined' || typeof user.firstName === 'undefined' || typeof user.lastName === 'undefined' || typeof user.password === 'undefined') {
    next(new InvalidArgumentException())
  }else{
    next();
  }

}

export default registerMiddleware;
