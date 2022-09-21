import { Request, Response, NextFunction, Router } from 'express';
import validateChildMiddleware from '../middleware/validation/validateChildMiddleware';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import { create, get, remove } from './children.service';
import { IClientChild } from '../interfaces/Child/IClientChild.interface';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';

class ChildrenController implements Controller {
  public path = '/children';
  public router = Router();

  constructor() {
    console.log("Initialize Children Controller...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware , this.getChild)
    this.router.post(`${this.path}/`, authMiddleware, validateChildMiddleware , this.addChild);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.removeChild);
  }

  private getChild = async(request: Request, response: Response, next: NextFunction) => {
    const id: string = request.params.id;
    if(typeof id === "string"){
      const result = await get(id);
      if(result){
        response.json(result);
      }else{
        next(new InternalServerErrorException("Could not read Child from database"))  
      }
    }else{
      next(new InternalServerErrorException("Error occured while processing provided id"));
    }
  }

  private addChild = async(request: Request, response: Response, next: NextFunction) => {
    const child: IClientChild = request.body;
    const result = await create(child);
    response.json(result);
  }

  private removeChild = async(request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const result = await remove(id);
  }

}

export default ChildrenController;
