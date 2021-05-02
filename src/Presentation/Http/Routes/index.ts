import { Router } from "express";
import { inject, injectable } from "inversify";
import { AccountRoutes } from "./accounts";
import { CustomerRoutes } from "./customer";

@injectable()
class PublicRoutes {
  private router: Router;
  private accountRoutes: AccountRoutes;
  private customerRoutes: CustomerRoutes;

  constructor(
    @inject(AccountRoutes) accountRoutes: AccountRoutes,
    @inject(CustomerRoutes) customerRoutes: CustomerRoutes
  ) {
    this.router = Router();
    this.accountRoutes = accountRoutes;
    this.customerRoutes = customerRoutes;
    this.setRoutes();
  }

  public getRoutes() {
    return this.router;
  }

  private setRoutes() {
    this.router.use("/customers", this.customerRoutes.getRoutes());
    this.router.use("/accounts", this.accountRoutes.getRoutes());
  }
}

export default PublicRoutes;
