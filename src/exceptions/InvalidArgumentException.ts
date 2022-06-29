import HttpException from './HttpException';

class InvalidArgumentException extends HttpException {
  constructor() {
    super(422, "Invalid Arguments Provided");
  }
}

export default InvalidArgumentException;
