"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const error_middleware_1 = require("./middleware/error.middleware");
const loggingHelper_1 = require("./utils/loggingHelper");
const cors = require("cors");
const databaseHelper_1 = require("./utils/databaseHelper");
const Helmet = require("helmet");
class App {
    constructor(controllers) {
        this.app = express();
        this.initializeStaticFiles();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeDatabase();
    }
    listen() {
        return this.app;
        // return this.app.listen(process.env.PORT, () => {
        //   console.log(`App running on Port: ${process.env.PORT}`);
        // });
    }
    getServer() {
        return this.app;
    }
    initializeStaticFiles() {
        this.app.use(express.static("client/build"));
    }
    initializeMiddlewares() {
        this.app.use(loggingHelper_1.logMiddleware);
        this.app.use(Helmet());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api/', controller.router);
        });
    }
    initializeDatabase() {
        databaseHelper_1.default.connect(process.env.MONGODB_URL);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map