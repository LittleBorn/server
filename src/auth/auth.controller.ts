import { Request, Response, NextFunction, Router } from 'express';
import { IRegisterUser } from '../interfaces/registerUser.interface';
import Controller from '../interfaces/controller.interface';
import registerMiddleware from '../middleware/register.middleware';
import { ILoginUser } from '../interfaces/loginUser.interface';
import loginMiddleware from '../middleware/login.middleware';
import RegisterService from './register.service';
import LoginService from './login.service';


class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();


  constructor() {
    console.log("Initialize Authentication...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, loginMiddleware,this.login);
    this.router.post(`${this.path}/register`, registerMiddleware, this.register);
    this.router.get(`${this.path}/logout/:id`, this.logout)
  }

  private register = async (request: Request, response: Response, next: NextFunction) => {
    const user: IRegisterUser = request.body;
    const registerService: RegisterService = new RegisterService(user);
    try {
      await registerService.createUserAtFirebase();
      await registerService.sendEmailVerification();
      await registerService.createUserAtDatabase();
      response.status(200).json(await registerService.getResponse());
    } catch (error) {
      console.log(error)
      response.json({
        error: error.code,
        message: error.message
      })
    }
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {
    const user: ILoginUser = request.body;
    const loginService: LoginService = new LoginService(user);
    try{
      await loginService.loginUserAtFirebase();
      response.status(200).json(await loginService.getResponse());
    }catch(error){
      console.log(error)
      response.json({
        error: error.code,
        message: error.message
      })
    }
  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {
    
  }

}

export default AuthenticationController;
