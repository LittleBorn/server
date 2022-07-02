import HttpException from './HttpException';

class AuthTokenException extends HttpException {
  constructor() {
    super(401, "Invalid Token");
  }
}

export default AuthTokenException;
