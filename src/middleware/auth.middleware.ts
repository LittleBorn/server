import AuthTokenException from '../exceptions/AuthTokenException';
import { NextFunction, Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {

  const authHeader: string = request.headers.authorization;

  try{
    const token: string = authHeader.split(' ')[1];
    if(typeof token === 'undefined') {
      next(new AuthTokenException())
    }else{
    
      const authService = new AuthService()
      const userAuthenticated: boolean = await authService.authenticateClient(token);

      if(userAuthenticated){
        request.headers.token = token;
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
