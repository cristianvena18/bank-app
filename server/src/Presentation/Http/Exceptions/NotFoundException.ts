import BaseHttpException from "./BaseHttpException";

export default class NotFoundException extends BaseHttpException {
  static fromError(e: Error, NOT_FOUND: number, code: string, href: string): NotFoundException {
    const error = new NotFoundException(e.message, NOT_FOUND, code, href);
    error.stack = e.stack;
    return error;
  }
  
  public constructor(
    message: string,
    status: number,
    type: string,
    href: string
  ) {
    // Calling parent constructor of base Error class.
    super(NotFoundException.name, message, status, type, href);

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status || 500;
    this.type = type || "INTERNAL_ERROR";
    this.href = href || "www.example.com/#INTERNAL_ERROR";
  }
}
