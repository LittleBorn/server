import { Request, Response, NextFunction, Router } from 'express';

import { IRegisterUser } from '../interfaces/registerUser.interface';
import Controller from '../interfaces/controller.interface';
import { ILoginUser } from '../interfaces/loginUser.interface';

import registerMiddleware from '../middleware/register.middleware';
import loginMiddleware from '../middleware/login.middleware';
import checkTokenMiddleware from '../middleware/checkToken.middleware';
import { get } from '../utils/shopifyHelper';
import { IShopifyCustomer } from '../interfaces/Shopify/IShopifyCustomer.interface';
import { AuthService } from './auth.service';


class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  private authService = new AuthService

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
    
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {
    const user: ILoginUser = request.body;
    const token: string = await this.authService.login(user)
    if(token){
      response.status(200).json({token})
    }else{
      response.status(400).json({});
    }
  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {
    
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
