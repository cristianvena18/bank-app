import { Router } from "express";
import { inject, injectable } from "inversify";
import { AccountRoutes } from "./accounts";
import { CustomerRoutes } from "./customer";
import { TransferRoutes } from "./transfer";

@injectable()
class PublicRoutes {
  private router: Router;
  private accountRoutes: AccountRoutes;
  private customerRoutes: CustomerRoutes;
  private transferRoutes: TransferRoutes;

  constructor(
    @inject(AccountRoutes) accountRoutes: AccountRoutes,
    @inject(CustomerRoutes) customerRoutes: CustomerRoutes,
    transferRoutes: TransferRoutes
  ) {
    this.router = Router();
    this.accountRoutes = accountRoutes;
    this.customerRoutes = customerRoutes;
    this.transferRoutes = transferRoutes;
    this.setRoutes();
  }

  public getRoutes() {
    return this.router;
  }

  private setRoutes() {
    this.router.use("/customers", this.customerRoutes.getRoutes());
    this.router.use("/accounts", this.accountRoutes.getRoutes());
    this.router.use('/transfers', this.transferRoutes.getRoutes());
  }
}

export default PublicRoutes;
