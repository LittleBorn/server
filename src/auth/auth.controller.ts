import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { AuthService } from './auth.service';
import authMiddleware from '../middleware/auth.middleware';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  private authService = new AuthService();

  constructor() {
    console.log("Initialize Authentication...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/logout`, authMiddleware, this.logout);
  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {
    response.send("TEST");
  }
}

export default AuthenticationController;
