import { inject, injectable } from "inversify";
import { Request, Response, Router } from "express";
import GetAction from "../Actions/Customer/GetAction";
import { asyncMiddleware } from "../Middlewares/AsyncMiddleware";

@injectable()
export class CustomerRoutes {
  private router: Router;
  public constructor(@inject(GetAction) private getAction: GetAction) {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get(
      "/:id",
      // (req: Request, res: Response, next: NextFunction) => {
      //   authMiddleware(req, res, next, []);
      // },
      asyncMiddleware(async (req: Request, res: Response) => {
        await this.getAction.execute(req, res);
      })
    );
  }

  public getRoutes() {
    return this.router;
  }
}
