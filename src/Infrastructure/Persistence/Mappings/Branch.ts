import { EntitySchema } from "typeorm";
import { AccountDTO } from "./Account";

export interface BranchDTO {
  id: string;
  accounts: AccountDTO[];
}

export const BranchModel = new EntitySchema<BranchDTO>({
  name: "branches",
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
      inverseSide: "branch",
    },
  },
});
