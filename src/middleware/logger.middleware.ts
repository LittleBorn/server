import { NextFunction, Request } from 'express';
import * as loggingHelper from "../utils/loggingHelper"


function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  console.log(`${request.method} ${request.path}`);
  loggingHelper.log(loggingHelper.LoggingLevel.info, `${request.method} ${request.path}`);
  next();
}

export default loggerMiddleware;
