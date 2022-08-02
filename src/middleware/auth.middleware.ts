import AuthTokenException from '../exceptions/AuthTokenException';
import { NextFunction, Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {

  const authHeader: string = request.headers.authorization;

  try{
    const token = authHeader.split(' ')[1];
    if(typeof token === 'undefined') {
      next(new AuthTokenException())
    }else{
      
      console.log("AUTH MIDDLEWARE TRIGGERED")
      console.log(token)

      const authService = new AuthService()
      const userAuthenticated: boolean = await authService.authenticateClient(token);

      if(userAuthenticated){
        next();
      }else{
        next(new NotAuthorizedException())
      }
    }
  }catch{
    next(new AuthTokenException())
  }

}

export default authMiddleware;
