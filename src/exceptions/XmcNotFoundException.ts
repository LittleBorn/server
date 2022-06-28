import HttpException from './HttpException';

class XmcNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Xmc with id ${id} not found`);
  }
}

export default XmcNotFoundException;
