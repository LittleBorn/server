import AuthTokenException from 'exceptions/AuthTokenException';
import { NextFunction, Response, Request } from 'express';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {

  const authHeader: string = request.headers.authorization;

  try{
    const token = authHeader.split(' ')[1];
    if(typeof token === 'undefined') {
      next(new AuthTokenException())
    }else{
      
      console.log("AUTH MIDDLEWARE TRIGGERED")
      console.log(token)

      // search in cache for token
      // if not found, search in database
      // TokenModel.findOne({token: token}, (err: any, token: any) => {
      //   if(err){
      //     next(new AuthTokenException())
      //   }
      // });
      // if not found, throw exception

    }
  }catch{
    next(new AuthTokenException())
  }

}

export default authMiddleware;
