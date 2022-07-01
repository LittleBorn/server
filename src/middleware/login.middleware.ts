import { NextFunction, Response, Request } from 'express';
import InvalidArgumentException from '../exceptions/InvalidArgumentException';

async function loginMiddleware(request: Request, response: Response, next: NextFunction) {

  const user = request.body;

  if(typeof user.email === 'undefined' ||  typeof user.password === 'undefined') {
    next(new InvalidArgumentException())
  }else{
    next();
  }

}

export default loginMiddleware;
