import { ContainerBuilder, Reference } from "node-dependency-injection";
import GetAction from "../../../Presentation/Http/Actions/Customer/GetAction";
import StoreAction from "../../../Presentation/Http/Actions/Account/StoreAction";
import MakeAction from "../../../Presentation/Http/Actions/Transfer/MakeAction";

export const registerActions = (container: ContainerBuilder) => {
  container.register("customer.getAction", GetAction, [
    new Reference("customer.getAdapter"),
    new Reference("customer.getHandler"),
  ]);
  container.register("account.storeAction", StoreAction, [
    new Reference("account.storeAdapter"),
    new Reference("account.storeHandler"),
  ]);
  container.register('transfer.makeAction', MakeAction, [
    new Reference('transfer.makeAdapter'),
    new Reference('transfer.makeHandler'),
  ])

  return container;
};
