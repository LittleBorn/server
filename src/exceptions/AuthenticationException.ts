import HttpException from './HttpException';

class InvalidArgumentException extends HttpException {
  constructor() {
    super(401, "Error occured while trying to perform authentication request");
  }
}

export default InvalidArgumentException;
