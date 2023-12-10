import { HttpError } from '../../../libs/rest/index.js';

export class BaseUserException extends HttpError {
  constructor(HttpStatusCode: number, message: string) {
    super(HttpStatusCode, message);
  }
}
