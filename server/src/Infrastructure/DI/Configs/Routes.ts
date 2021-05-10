import { ContainerBuilder, Reference } from "node-dependency-injection";
import PublicRoutes from "../../../Presentation/Http/Routes";
import CustomerRoutes from "../../../Presentation/Http/Routes/customer";
import { AccountRoutes } from "../../../Presentation/Http/Routes/accounts";
import { TransferRoutes } from "../../../Presentation/Http/Routes/transfer";

export const registerRoutes = (container: ContainerBuilder) => {
  container.register("Routes.customer", CustomerRoutes, [
    new Reference("customer.getAction"),
  ]);
  container.register("Routes.account", AccountRoutes, [
    new Reference("account.storeAction"),
  ]);

  container.register('Routes.transfer', TransferRoutes, [
    new Reference('transfer.makeAction')
  ])

  container.register("Routes.index", PublicRoutes, [
    new Reference("Routes.account"),
    new Reference("Routes.customer"),
    new Reference("Routes.transfer"),
  ]);

  

  return container;
};
