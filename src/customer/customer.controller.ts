import { Request, Response, NextFunction, Router } from 'express';
import CustomerModel from '../schemas/customer.model';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import validateCreateCustomerMiddleware from '../middleware/validation/validateCreateCustomerMiddleware';
import { IClientCustomer } from '../interfaces/Customer/IClientCustomer.interface';
import { addChildAssociation, create, get, removeChildAssociation } from './customer.service';
import { AuthService } from '../auth/auth.service';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';

class CustomerController implements Controller {
  public path = '/customer';
  public router = Router();

  constructor() {
    console.log("Initialize Customer Controller...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, authMiddleware, validateCreateCustomerMiddleware, this.addCustomer);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getCustomer);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.removeCustomer);
    this.router.put(`${this.path}/`, authMiddleware, validateCreateCustomerMiddleware, this.modifyCustomer);

    this.router.get(`${this.path}/addChildAssociation/:id`, authMiddleware, this.addChildAssociation);
    this.router.delete(`${this.path}/removeChildAssociation/:id`, authMiddleware, this.removeChildAssociation);
  }

  private getCustomer = async (request: Request, response: Response, next: NextFunction) => {
    const customerId: string = request.params.id;
    const result: any = await get(customerId);
    if(result){
      response.status(200).json(result);
    }else{
      next(new InternalServerErrorException("Could not fetch from Database!"));
    }
  }

  private addCustomer = async (request: Request, response: Response, next: NextFunction) => {
    const customer: IClientCustomer = request.body;
    const result = await create(customer);
    if(result){
      response.status(200).json(result);
    }else{
      next(new InternalServerErrorException("Could not create Customer at database"));
    }
  }

  private removeCustomer = async (request: Request, response: Response, next: NextFunction) => {
    const customerId: string = request.params.id;
    
  }

  private modifyCustomer = async (request: Request, response: Response, next: NextFunction) => {

  }

  private addChildAssociation = async (request: Request, response: Response, next: NextFunction) => {
    const childrenId: string = request.params.id;
    const accessToken: string = request.headers.authorization.split(' ')[1];
    const authService = new AuthService();
    const shopifyId: string = await authService.getShopifyIdWithAccessToken(accessToken);
    if (typeof childrenId === "string" && typeof shopifyId === "string") {
      const savedDoc = await addChildAssociation(shopifyId, childrenId);
      if (savedDoc) {
        response.json({ id: 0, customer: savedDoc });
      } else {
        next(new InternalServerErrorException("Unable to change data in the database"));
      }
    } else {
      next(new InternalServerErrorException("Error occured while processing provided id's"));
    }
  }

  private removeChildAssociation = async (request: Request, response: Response, next: NextFunction) => {
    const childrenId: string = request.params.id;
    const accessToken: string = request.headers.authorization.split(' ')[1];
    const authService = new AuthService();
    const shopifyId: string = await authService.getShopifyIdWithAccessToken(accessToken);
    if (typeof childrenId === "string" && typeof shopifyId === "string") {
      const savedDoc = await removeChildAssociation(shopifyId, childrenId);
      if (savedDoc) {
        response.json({ id: 0, customer: savedDoc });
      } else {
        next(new InternalServerErrorException("Unable to change data in the database"));
      }
    } else {
      next(new InternalServerErrorException("Error occured while processing provided id's"));
    }
  }

}

export default CustomerController;
