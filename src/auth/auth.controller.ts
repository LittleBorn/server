import { Request, Response, NextFunction, Router } from 'express';
import { IRegisterUser } from '../interfaces/registerUser.interface';
import Controller from '../interfaces/controller.interface';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../utils/firebaseHelper";
import registerMiddleware from '../middleware/register.middleware';
import UserModel from '../schemas/user.schema';


class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();


  constructor() {
    console.log("Initialize Authentication...")
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/register`, registerMiddleware, this.register);
    this.router.get(`${this.path}/logout/:id`, this.logout)
  }

  private register = async (request: Request, response: Response, next: NextFunction) => {
    const user: IRegisterUser = request.body;
    try {
      const firebaseCredentails = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await sendEmailVerification(firebaseCredentails.user);
      console.log({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        children: [],
        firebase: firebaseCredentails.user
      })
      const res = await UserModel.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        children: [],
        firebase: firebaseCredentails.user
      })
      response.status(200).json(res);
    } catch (error) {
      console.log(error)
      response.json({
        error: error.code,
        message: error.message
      })
    }
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {

  }

  private logout = async(request: Request, response: Response, next: NextFunction) => {

  }

}

export default AuthenticationController;
