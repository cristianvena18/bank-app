import BaseHttpException from "./BaseHttpException";

export default class ForeignKeyConstraintException extends BaseHttpException {
  static fromError(e: Error, CONFLICT: number, code: string, href: string): any {
    const error = new ForeignKeyConstraintException(e.message, CONFLICT, code, href);
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
    super(ForeignKeyConstraintException.name, message, status, type, href);

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
