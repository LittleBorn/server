import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();


  constructor() {
    console.log("Initialize Authentication...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/register`, this.register);
    this.router.get(`${this.path}/logout/:id`, this.logout)
  }

  private register = async (request: Request, response: Response, next: NextFunction) => {
    console.log("Register...")
    console.log(request.body)
    response.json("Test")
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {

  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {

  }

}

export default AuthenticationController;
