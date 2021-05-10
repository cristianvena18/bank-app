import { ContainerBuilder, Reference } from "node-dependency-injection";
import GetHandler from "../../../Application/Queries/Handler/Customer/GetHandler";
import StoreHandler from "../../../Application/Commands/Handler/Account/StoreHandler";
import MakeHandler from "../../../Application/Commands/Handler/Transfer/MakeHandler";

export const registerHandler = (container: ContainerBuilder) => {
  container.register("customer.getHandler", GetHandler, [
    new Reference("Repositories.customer"),
  ]);
  container.register("account.storeHandler", StoreHandler, [
    new Reference("Repositories.account"),
    new Reference("Repositories.customer"),
    new Reference("Repositories.branch"),
    new Reference("Repositories.employee"),
    new Reference("eventBus"),
  ]);
  container.register('transfer.makeHandler', MakeHandler, [
    new Reference('Repositories.account'),
    new Reference('services.transfer')
  ])

  return container;
};
