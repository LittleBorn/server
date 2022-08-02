import { Request, Response, NextFunction, Router } from 'express';
import validateChildMiddleware from '../middleware/validation/validateChildMiddleware';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import { create } from './children.service';
import { IClientChild } from '../interfaces/Child/IClientChild.interface';

class AuthenticationController implements Controller {
  public path = '/children';
  public router = Router();

  constructor() {
    console.log("Initialize Authentication...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, authMiddleware, validateChildMiddleware , this.addChild);
  }

  private addChild = async(request: Request, response: Response, next: NextFunction) => {
    const child: IClientChild = request.body;
    const result = await create(child);
  }

}

export default AuthenticationController;
