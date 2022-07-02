import AuthTokenException from '../exceptions/AuthTokenException';
import { NextFunction, Response, Request } from 'express';

async function checkTokenMiddleware(request: Request, response: Response, next: NextFunction) {

  const authHeader: string = request.headers.authorization;

  try{
    const token = authHeader.split(' ')[1];
    if(typeof token === 'undefined') {
      next(new AuthTokenException())
    }else{
      next();
    }
  }catch{
    next(new AuthTokenException())
  }
}

export default checkTokenMiddleware;
