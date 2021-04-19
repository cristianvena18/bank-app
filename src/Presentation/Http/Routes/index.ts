import { Router } from "express";
import { inject, injectable } from "inversify";
import { AccountRoutes } from "./accounts";

@injectable()
class PublicRoutes {
  private router: Router;
  private accountRoutes: AccountRoutes;
  constructor(@inject(AccountRoutes) accountRoutes: AccountRoutes) {
    this.router = Router();
    this.accountRoutes = accountRoutes;
    this.setRoutes();
  }

  public getRoutes() {
    return this.router;
  }

  private setRoutes() {
    this.router.use("/accounts", this.accountRoutes.getRoutes());
  }
}

export default PublicRoutes;
