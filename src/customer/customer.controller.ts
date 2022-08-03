import { Request, Response, NextFunction, Router } from 'express';
import CustomerModel from '../schemas/customer.model';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import validateCreateCustomerMiddleware from '../middleware/validation/validateCreateCustomerMiddleware';
import { IClientCustomer } from 'interfaces/Customer/IClientCustomer.interface';
import { create } from './customer.service';
import { AuthService } from '../auth/auth.service';

class CustomerController implements Controller {
  public path = '/customer';
  public router = Router();

  constructor() {
    console.log("Initialize Customer Controller...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, authMiddleware, validateCreateCustomerMiddleware, this.addCustomer);
    this.router.get(`${this.path}/addChildAssociation/:id`, authMiddleware, this.addChildAssociation);
    // this.router.delete(`${this.path}/:id`, authMiddleware, this.removeChild);
  }

  private getCustomer = async(request: Request, response: Response, next: NextFunction) => {

  }

  private addCustomer = async(request: Request, response: Response, next: NextFunction) => {
    const customer: IClientCustomer = request.body;
    const result = await create(customer);
    response.status(200).json(result);
  }

  private removeCustomer = async(request: Request, response: Response, next: NextFunction) => {

  }

  private changeCustomer = async(request: Request, response: Response, next: NextFunction) => {

  }

  private addChildAssociation = async(request: Request, response: Response, next: NextFunction) => {
    const childrenId: string = request.params.id;
    const accessToken: string = request.headers.authorization.split(' ')[1];
    const authService = new AuthService();
    const customerId: string = await authService.getCustomerIdWithAccessToken(accessToken);
    if(typeof childrenId === "string" && typeof customerId === "string"){
      try{
        const customer = await CustomerModel.findOne({shopifyId: customerId});
        customer.children.push(childrenId);
        const savedDoc = await customer.save();
        if(customer == savedDoc){
          response.json({id: 0, customer: savedDoc});
        }else{
          response.json({id: 1, customer: customer});
        }
      }catch(e){
        response.status(402).json({ err: e });
      }
    }else{
      response.status(402).json({ err: "fehler beim auslesen der paramenter" });
    }
  }

}

export default CustomerController;
