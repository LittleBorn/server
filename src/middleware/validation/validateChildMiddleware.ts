import { NextFunction, Response, Request } from 'express';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';

async function validateChildMiddleware(request: Request, response: Response, next: NextFunction) {

  const child = request.body;

  if(typeof child.childName === 'undefined' ||  typeof child.height === 'undefined'  ||  typeof child.weight === 'undefined' ||  typeof child.gender === 'undefined' ||  typeof child.birthDate === 'undefined') {
    next(new InvalidArgumentException())
  }else{
    next();
  }

}

export default validateChildMiddleware;
