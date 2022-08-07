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
    this.router.get(`${this.path}/getIdFromAccessToken`, authMiddleware, this.getIdFromAccessToken);
  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {
    response.send(JSON.stringify(new Date()));
  }

  private getIdFromAccessToken = async(request: Request, response: Response, next: NextFunction) => {
    const accessToken: string = request.headers.authorization.split(' ')[1];
    const customerId: string = await this.authService.getCustomerIdWithAccessToken(accessToken);
    response.status(200).json({
      id: customerId
    })
  }
}

export default AuthenticationController;
