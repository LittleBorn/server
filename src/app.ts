import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import { logMiddleware } from './utils/loggingHelper';
import * as cors from 'cors';
import Database from './utils/databaseHelper';
const Helmet = require("helmet");

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeStaticFiles();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeDatabase();
  }

  public listen(): express.Application {
    return this.app;
    // return this.app.listen(process.env.PORT, () => {
    //   console.log(`App running on Port: ${process.env.PORT}`);
    // });
  }

  public getServer() {
    return this.app;
  }

  private initializeStaticFiles() {
    this.app.use(express.static("client/build"));
  } 

  private initializeMiddlewares() {
    this.app.use(logMiddleware)
    this.app.use(Helmet())
    this.app.use(cors())
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
    });
  }

  private initializeDatabase() {
    Database.connect(process.env.MONGODB_URL);
  }
}

export default App;
