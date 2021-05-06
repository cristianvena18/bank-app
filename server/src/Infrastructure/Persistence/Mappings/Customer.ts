import { AccountDTO } from "./Account";
import { EntitySchema } from "typeorm";

export interface CustomerDTO {
  id: string;
  name: string;
  surname: string;
  email: string;
  accounts: AccountDTO[];
}

export const CustomerModel = new EntitySchema<CustomerDTO>({
  name: "customers",
  columns: {
    id: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  relations: {
    accounts: {
      type: "one-to-many",
      target: "accounts",
      inverseSide: "customer",
    },
  },
});
