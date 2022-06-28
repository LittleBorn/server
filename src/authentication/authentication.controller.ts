import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import * as authenticationHelper from "./authenticationHelper"

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();

  constructor() {
    console.log("Initialize Authentication...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.loggingIn);
    this.router.get(`${this.path}/clearToken/:id`, this.clearToken)
  }


  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {

    const AuthToken = await authenticationHelper.checkLDAPCredentials(request.body.username, request.body.password);

    if (AuthToken) {

        console.log("Generated AuthToken: ", AuthToken)
        response.json({token: AuthToken});

    } else {
      next(new WrongCredentialsException());
    }
  }

  private clearToken = async(request: Request, response: Response, next: NextFunction) => {

    const token = request.params.id;

    let res = authenticationHelper.clearToken(token)

    if(res){
      response.send(true)
    }else{
      response.send(false)
    }

  }

}

export default AuthenticationController;
