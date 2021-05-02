import { ContainerBuilder, Reference } from "node-dependency-injection";
import GetAction from "../../../Presentation/Http/Actions/Customer/GetAction";
import StoreAction from "../../../Presentation/Http/Actions/Account/StoreAction";

export const registerActions = (container: ContainerBuilder) => {
  container.register("customer.getAction", GetAction, [
    new Reference("customer.getAdapter"),
    new Reference("customer.getHandler"),
  ]);
  container.register("account.storeAction", StoreAction, [
    new Reference("account.storeAdapter"),
    new Reference("account.storeHandler"),
  ]);

  return container;
};
