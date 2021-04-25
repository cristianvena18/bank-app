import { EntitySchema } from "typeorm";
import { CustomerDTO } from "./Customer";
import { EmployeeDTO } from "./Employee";
import { BranchDTO } from "./Branch";

export interface AccountDTO {
  id: string;
  number: string;
  type: string;
  status: string;
  balance: string;
  currency: string;
  customer: CustomerDTO;
  employee: EmployeeDTO;
  branch: BranchDTO;
}

export const AccountModel = new EntitySchema<AccountDTO>({
  name: "accounts",
  columns: {
    id: {
      type: String,
      primary: true,
    },
    number: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    balance: {
      type: String,
    },
    currency: {
      type: String,
    },
  },
  relations: {
    customer: {
      type: "many-to-one",
      target: "customers",
      joinColumn: true,
    },
    employee: {
      type: "many-to-one",
      target: "employees",
      joinColumn: true,
    },
    branch: {
      type: "many-to-one",
      target: "branches",
      joinColumn: true,
    },
  },
});
