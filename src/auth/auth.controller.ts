import { Request, Response, NextFunction, Router } from 'express';

import { IRegisterUser } from '../interfaces/registerUser.interface';
import Controller from '../interfaces/controller.interface';
import { ILoginUser } from '../interfaces/loginUser.interface';

import RegisterService from './register.service';
import LoginService from './login.service';

import registerMiddleware from '../middleware/register.middleware';
import loginMiddleware from '../middleware/login.middleware';
import AuthService from './auth.service';
import checkTokenMiddleware from '../middleware/checkToken.middleware';


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
    this.router.get(`${this.path}/logout`, checkTokenMiddleware, this.logout);
  }

  private register = async (request: Request, response: Response, next: NextFunction) => {
    const user: IRegisterUser = request.body;
    const registerService: RegisterService = new RegisterService();
    try {
      const firebaseUser = await registerService.createUserAtFirebase(user);
      await registerService.sendEmailVerification(firebaseUser);
      await registerService.createUserAtDatabase(user, firebaseUser);
      const token = await registerService.generateAuthToken(firebaseUser.uid, firebaseUser);
      response.status(200).json(token);
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
    const loginService: LoginService = new LoginService();
    try{
      const firebaseUser = await loginService.loginUserAtFirebase(user);
      const token = await loginService.generateAuthToken(firebaseUser.uid, firebaseUser);
      response.status(200).json(token);
    }catch(error){
      console.log(error)
      response.json({
        error: error.code,
        message: error.message
      })
    }
  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {
    try{
      const token = request.headers.authorization.split(' ')[1];
      const authService = new AuthService();
      authService.removeTokenFromDatabase(token);
      response.status(200).json(true)
    }catch(error){
      response.json({
        error: error.code,
        message: error.message
      })
    }
  }

  private updateEmailAddress = async(request: Request, response: Response, next: NextFunction) => {
    
  }

  private updatePassword = async(request: Request, response: Response, next: NextFunction) => {
  
  }

  private updateProfile = async(request: Request, response: Response, next: NextFunction) => {

  }

  private deleteUser = async(request: Request, response: Response, next: NextFunction) => {
    
  }

}

export default AuthenticationController;
