import { Request, Response, NextFunction, Router } from 'express';
import CustomerModel from '../schemas/customer.model';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import { create, remove } from './customer.service';

class CustomerController implements Controller {
  public path = '/customer';
  public router = Router();

  constructor() {
    console.log("Initialize Customer Controller...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.addChildAssociation);
    // this.router.delete(`${this.path}/:id`, authMiddleware, this.removeChild);
  }

  private addChildAssociation = async(request: Request, response: Response, next: NextFunction) => {
    const childrenId: string = request.params.id;
    const parentId: string = request.headers.authorization.split(' ')[1];
    if(typeof childrenId === "string" && typeof parentId === "string"){
      const parent = await CustomerModel.findOne({_id: parentId});
      response.json(parent);
    }else{
      response.status(402).json({ err: "error occured" });
    }
  }

}

export default CustomerController;
