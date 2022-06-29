import { Request, Response, NextFunction, Router } from 'express';
import { IRegisterUser } from '../interfaces/registerUser.interface';
import Controller from '../interfaces/controller.interface';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../utils/firebaseHelper";
import registerMiddleware from '../middleware/register.middleware';


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
    console.log("Register...")
    const user: IRegisterUser = request.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await sendEmailVerification(userCredential.user);
      console.log(userCredential)
      response.send(userCredential);
    } catch (error) {
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
