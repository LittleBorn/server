import HttpException from './HttpException';

class InternalServerErrorException extends HttpException {
  constructor(msg?: string) {
    super(401, msg || "Error occured while processing the request!");
  }
}

export default InternalServerErrorException;
