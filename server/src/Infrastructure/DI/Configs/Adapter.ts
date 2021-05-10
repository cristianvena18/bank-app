import { ContainerBuilder, Reference } from "node-dependency-injection";
import GetAdapter from "../../../Presentation/Http/Adapters/Customer/GetAdapter";
import StoreAdapter from "../../../Presentation/Http/Adapters/Account/StoreAdapter";
import MakeAdapter from "../../../Presentation/Http/Adapters/Transfer/MakeAdapter";

export const registerAdapters = (container: ContainerBuilder) => {
  container.register("customer.getAdapter", GetAdapter, [
    new Reference("validationService"),
  ]);
  container.register("account.storeAdapter", StoreAdapter, [
    new Reference("validationService"),
  ]);
  container.register("transfer.makeAdapter", MakeAdapter, [
    new Reference("validationService"),
  ]);

  return container;
};
