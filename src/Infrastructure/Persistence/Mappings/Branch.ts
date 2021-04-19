import { EntitySchema } from "typeorm";

export interface BranchDTO {
  id: string;
}

export const BranchModel = new EntitySchema<BranchDTO>({
  name: "branches",
  columns: {
    id: {
      type: String,
      primary: true,
    },
  },
});
