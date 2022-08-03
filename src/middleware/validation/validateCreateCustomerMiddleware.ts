import { NextFunction, Response, Request } from 'express';
import InvalidArgumentException from '../../exceptions/InvalidArgumentException';

async function validateCreateCustomerMiddleware(request: Request, response: Response, next: NextFunction) {

  const customer = request.body;

  if(typeof customer.shopifyId === 'undefined') {
    next(new InvalidArgumentException())
  }else{
    next();
  }

}

export default validateCreateCustomerMiddleware;
