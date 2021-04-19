import { inject, injectable } from "inversify";
import StoreAction from "../Actions/Account/StoreAction";
import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../Middlewares/AuthMiddleware";
import { asyncMiddleware } from "../Middlewares/AsyncMiddleware";

@injectable()
export class AccountRoutes {
  private storeAction: StoreAction;
  private router: Router;
  public constructor(@inject(StoreAction) storeAction: StoreAction) {
    this.router = Router();
    this.storeAction = storeAction;
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post(
      "/",
      // (req: Request, res: Response, next: NextFunction) => {
      //   authMiddleware(req, res, next, []);
      // },
      asyncMiddleware(async (req: Request, res: Response) => {
        await this.storeAction.execute(req, res);
      })
    );
  }

  public getRoutes() {
    return this.router;
  }
}
