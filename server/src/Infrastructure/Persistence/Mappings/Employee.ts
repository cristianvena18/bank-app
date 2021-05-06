import { EntitySchema } from "typeorm";
import { AccountDTO } from "./Account";

export interface EmployeeDTO {
  id: string;
  accounts: AccountDTO[];
}

export const EmployeeModel = new EntitySchema<EmployeeDTO>({
  name: "employees",
  columns: {
    id: {
      type: String,
      primary: true,
    },
  },
  relations: {
    accounts: {
      type: "one-to-many",
      target: "accounts",
      inverseSide: "employee",
    },
  },
});
