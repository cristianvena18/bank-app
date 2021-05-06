import { NextFunction, Request, Response } from "express";

export const asyncMiddleware = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};
